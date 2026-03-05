const { Medico } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const medicoService = {
  login: async (data) => {
    const { crm, senha_corporativa } = data;

    // Validação dos campos
    if (!crm || !senha_corporativa) {
      return res.status(400).json({ msg: "CRM e senha são obrigatórios." });
    }

    const medico = await Medico.findOne({ where: { crm } });

    if (!medico) {
      return res.status(400).json({
        msg: "CRM incorreto",
      });
    }

    const isValida = await bcrypt.compare(
      senha_corporativa,
      medico.senha_corporativa,
    );
    if (!isValida) {
      return res.status(400).json({ msg: "Senha incorreta." });
    }

    const token = jwt.sign(
      { id: medico.id, crm: medico.crm },
      process.env.SECRET,
      { expiresIn: "1h" },
    );
    return {
      token: token,
      medico: medico.nome_completo,
      id: medico.id,
    };
  },

  esqueciSenha: async (data) => {
    const { email_corporativo, novaSenha } = data;
    // Primeiro busca o admin pelo email
    const medico = await Medico.findOne({ where: { email_corporativo } });

    if (!medico) {
      throw new Error("Email do médico não encontrado.");
    }

    // Verifica se a nova senha tem pelo menos 6 caracteres
    if (novaSenha.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres");
    }

    // Validação básica dos campos
    if (!email_corporativo || !novaSenha) {
      return res.status(400).json({
        msg: "Email e nova senha são obrigatórios",
      });
    }
    const hashSenha = await bcrypt.hash(novaSenha, 10);
    await medico.update({ senha_corporativa: hashSenha });
    return medico;
  },

  create: async (dadosMedico) => {
    const {
      nome_completo,
      dataNascimento,
      cpf,
      crm,
      telefone,
      endereco,
      especialidade,
      email_corporativo,
      senha_corporativa,
    } = dadosMedico;

    const foto = req.file ? `/uploads/${req.file.filename}` : null;

    const dominioPermitido = "@hsaintmichel.com";
    if (!email_corporativo.endsWith(dominioPermitido)) {
      throw new Error(`O email deve ser do domínio ${dominioPermitido}`);
    }

    const cpfExistente = await medicoService.findByCPF(cpf);
    if (cpfExistente) {
      throw new Error("CPF já cadastrado.");
    }

    const crmExistente = await medicoService.findByCRM(crm);
    if (crmExistente) {
      throw new Error("CRM já cadastrado.");
    }

    const emailExistente = await medicoService.findByEmail(email_corporativo);
    if (emailExistente) {
      throw new Error("Email já cadastrado.");
    }

    const cpfLimpo = cpf.replace(/\D/g, "");
    const telefoneLimpo = telefone.replace(/\D/g, "");

    const hashedSenha = await bcrypt.hash(dadosMedico.senha_corporativa, 10);

    const novoCadastroMedico = await Medico.create({
      nome_completo,
      dataNascimento,
      cpf: cpfLimpo,
      crm,
      telefone: telefoneLimpo,
      endereco,
      especialidade,
      email_corporativo,
      senha_corporativa: hashedSenha,
      foto,
    });

    return novoCadastroMedico;
  },

  findById: async (data) => {
    const { id } = data;
    const medico = await Medico.findByPk(id);
    if (!medico) {
      throw new Error("Médico não encontrado.");
    }
    return medico;
  },

  findAll: async () => {
    return await Medico.findAll();
  },

  update: async (data) => {
    const { id, dadosAtualizados } = data;
    const medico = await Medico.findByPk(id);
    if (!medico) {
      throw new Error("Médico não encontrado.");
    }
    // Atualizar a imagem se for enviada
    if (req.file) {
      dadosAtualizados.foto = `/uploads/${req.file.filename}`;
    }
    // Se houver senha nova, criptografa antes de atualizar
    if (dadosAtualizados.senha_corporativa) {
      dadosAtualizados.senha_corporativa = await bcrypt.hash(
        dadosAtualizados.senha_corporativa,
        10,
      );
    }

    await medico.update(dadosAtualizados);
    return medico;
  },

  delete: async (id) => {
    try {
      const medico = await Medico.findByPk(id);
      if (!medico) {
        throw new Error("Médico não encontrado.");
      }

      await medico.destroy();
      return { msg: "Médico removido com sucesso." };
    } catch (error) {
      throw error;
    }
  },

  buscarMedicosPorEspecialidade: async (data) => {
    const { especialidade } = data;
    return await Medico.findAll({
      where: {
        especialidade: especialidade,
      },
    });
  },

  findByCPF: async (cpf) => {
    try {
      const medico = await Medico.findOne({ where: { cpf } });
      return medico;
    } catch (error) {
      throw error;
    }
  },

  findByCRM: async (crm) => {
    try {
      const medico = await Medico.findOne({ where: { crm } });
      return medico;
    } catch (error) {
      throw error;
    }
  },

  findByEmail: async (email) => {
    try {
      const medico = await Medico.findOne({
        where: { email_corporativo: email },
      });
      return medico;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = medicoService;
