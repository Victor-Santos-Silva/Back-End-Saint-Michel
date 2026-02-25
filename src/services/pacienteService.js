const Agendamento = require("../models/Agendamento");
const Pacientes = require("../models/Pacientes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PacientesService = {
  login: async (date) => {
    const { email, senha } = date;

    const pacientes = await Pacientes.findOne({ where: { email } });
    if (!pacientes) {
      throw new Error("Pacientes não encontrado");
    }
    const isValid = await bcrypt.compare(senha, pacientes.senha);
    if (!isValid) {
      throw new Error("Senha incorreta");
    }

    const token = jwt.sign(
      {
        id: pacientes.id,
        email: pacientes.email,
        nome: pacientes.nomeCompleto,
      },
      process.env.SECRET,
      { expiresIn: "1h" },
    );
    return { token, nomeCompleto: pacientes.nomeCompleto, id: pacientes.id };
  },

  create: async (cadastro) => {
    try {
      const {
        nomeCompleto,
        dataDeNascimento,
        cpf,
        rg,
        genero,
        endereco,
        telefone,
        convenioMedico,
        planoConvenio,
        tipoSanguineo,
        email,
        senha,
        imagemGenero,
      } = cadastro;

      // Hash apenas na senha principal
      const hashSenha = await bcrypt.hash(senha, 10);

      // Salva os dois campos no banco
      return await Pacientes.create({
        nomeCompleto,
        dataDeNascimento,
        cpf,
        rg,
        genero,
        endereco,
        telefone,
        convenioMedico,
        planoConvenio,
        tipoSanguineo,
        email,
        senha: hashSenha,
        imagemGenero,
      });
    } catch (error) {
      throw new Error(error.message || "Erro ao criar paciente.");
    }
  },
  esqueciSenha: async (date) => {
    const { email, senhaNova } = date;

    if (!email || !senhaNova) {
      throw new Error("Email e nova senha são obrigatórios");
    }

    const pacientes = await Pacientes.findOne({ where: { email } });

    if (!pacientes) {
      throw new Error("Pacientes não encontrado");
    }

    const hashSenha = await bcrypt.hash(senhaNova, 10);
    await Pacientes.update({ senha: hashSenha }, { where: { email } });
    return pacientes;
  },
  getById: async (id) => {
    try {
      const pacientes = await Pacientes.findByPk(id);
      if (!pacientes) {
        throw new Error("Usuário não encontrado!");
      }
      return await Pacientes.findByPk(id);
    } catch (error) {
      throw new Error("Erro ao buscar usuário.");
    }
  },
  getAll: async () => {
    try {
      return await Pacientes.findAll();
    } catch (error) {
      throw new Error(error.message || "Erro ao buscar usuários.");
    }
  },
  update: async (id, atualizacao) => {
    try {
      const pacientes = await Pacientes.findByPk(id);
      if (!pacientes) {
        throw new Error("Pacientes não encontrado.");
      }

      if (atualizacao.senha) {
        const hashSenha = await bcrypt.hash(atualizacao.senha, 10);
        atualizacao.senha = hashSenha;
      }

      await Pacientes.update(atualizacao, { where: { id } });
      return pacientes;
    } catch (error) {
      throw new Error(error.message || "Erro ao atualizar paciente.");
    }
  },
  delete: async (id) => {
    try {
      const pacientesDeletado = await Pacientes.findByPk(id);
      if (!pacientesDeletado) {
        throw new Error("Pacientes não encontrado.");
      }

      await Agendamento.destroy({
        where: { Pacientes_id: id },
      });

      await pacientesDeletado.destroy();
      return { msg: "Pacientes removido com sucesso." };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = PacientesService;
