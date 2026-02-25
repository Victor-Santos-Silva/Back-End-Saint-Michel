const { Paciente, Agendamento } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PacientesService = {
  login: async (login) => {
    try {
      const { email, senha } = login;

      if (!email || !senha) {
        throw new Error("Email e senha são obrigatórios.");
      }

      const pacientes = await Paciente.findOne({ where: { email } });

      if (!pacientes) {
        throw new Error("Paciente não encontrado");
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
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  },

  create: async (cadastro) => {
    try {
      const {
        nomeCompleto,
        data_nascimento,
        cpf,
        rg,
        genero,
        endereco,
        telefone,
        convenio_medico,
        plano_convenio,
        tipo_sanguineo,
        email,
        senha,
      } = cadastro;

      //Validação do nome completo
      if (nomeCompleto.length < 3) {
        throw new Error("O nome completo deve conter pelo menos 3 caracteres.");
      } else if (nomeCompleto.length > 255) {
        throw new Error(
          "O nome completo deve conter no máximo 255 caracteres.",
        );
      } else if (!/^[a-zA-Z\s]+$/.test(nomeCompleto)) {
        throw new Error("O nome completo deve conter apenas letras e espaços.");
      } else if (/\d/.test(nomeCompleto)) {
        throw new Error("O nome completo não deve conter números.");
      } else if (/[!@#$%^&*(),.?":{}|<>]/.test(nomeCompleto)) {
        throw new Error(
          "O nome completo não deve conter caracteres especiais.",
        );
      } else if (/\s{2,}/.test(nomeCompleto)) {
        throw new Error(
          "O nome completo não deve conter múltiplos espaços consecutivos.",
        );
      } else if (nomeCompleto.trim().length === 0) {
        throw new Error(
          "O nome completo não deve ser vazio ou conter apenas espaços.",
        );
      } else if (!nomeCompleto) {
        throw new Error("O nome completo é obrigatório.");
      }

      //Validação da data de nascimento
      if (data_nascimento.toString().length < 10) {
        throw new Error(
          "A data de nascimento deve ter no mínimo 10 caracteres (formato: YYYY-MM-DD).",
        );
      } else if (data_nascimento > new Date()) {
        throw new Error("A data de nascimento deve ser no passado.");
      } else if (!data_nascimento) {
        throw new Error("A data de nascimento é obrigatória.");
      }

      //Validação do CPF
      if (!cpf) {
        throw new Error("CPF é obrigatório.");
      } else if (!/^\d{11}$/.test(cpf)) {
        throw new Error("CPF deve conter exatamente 11 dígitos numéricos.");
      } else if (/\D/.test(cpf)) {
        throw new Error("CPF deve conter apenas dígitos numéricos.");
      } else if (cpf.length !== 11) {
        throw new Error("CPF deve conter exatamente 11 dígitos.");
      } else if (cpf.split("").every((char) => char === cpf[0])) {
        throw new Error("CPF não pode conter todos os dígitos iguais.");
      }
      const cpfExistente = await Paciente.findOne({ where: { cpf } });
      if (cpfExistente) {
        throw new Error("CPF já está em uso por outro paciente.");
      }

      //validação do RG
      if (!rg) {
        throw new Error("RG é obrigatório.");
      } else if (!/^\d{9}$/.test(rg)) {
        throw new Error("RG deve conter exatamente 9 dígitos numéricos.");
      } else if (/\D/.test(rg)) {
        throw new Error("RG deve conter apenas dígitos numéricos.");
      } else if (rg.length !== 9) {
        throw new Error("RG deve conter exatamente 9 dígitos.");
      } else if (rg.split("").every((char) => char === rg[0])) {
        throw new Error("RG não pode conter todos os dígitos iguais.");
      }
      const rgExistente = await Paciente.findOne({ where: { rg } });
      if (rgExistente) {
        throw new Error("RG já está em uso por outro paciente.");
      }

      //validação do gênero
      if (!genero) {
        throw new Error("Gênero é obrigatório.");
      } else if (!["Masculino", "Feminino", "Outro"].includes(genero)) {
        throw new Error("Gênero deve ser 'Masculino', 'Feminino' ou 'Outro'.");
      }

      //Validação do endereço
      if (!endereco) {
        throw new Error("Endereço é obrigatório.");
      } else if (endereco.length < 5) {
        throw new Error("O endereço deve conter pelo menos 5 caracteres.");
      } else if (endereco.length > 255) {
        throw new Error("O endereço deve conter no máximo 255 caracteres.");
      }

      //Validação do telefone
      if (!telefone) {
        throw new Error("Telefone é obrigatório.");
      } else if (!/^\d{10,11}$/.test(telefone)) {
        throw new Error(
          "Telefone deve conter 10 ou 11 dígitos numéricos (com DDD).",
        );
      } else if (/\D/.test(telefone)) {
        throw new Error("Telefone deve conter apenas dígitos numéricos.");
      } else if (telefone.length < 10 || telefone.length > 11) {
        throw new Error("Telefone deve conter 10 ou 11 dígitos.");
      }

      //validacao convenio_medico
      if (!convenio_medico) {
        throw new Error("Convênio médico é obrigatório.");
      } else if (convenio_medico.length < 3) {
        throw new Error(
          "O convênio médico deve conter pelo menos 3 caracteres.",
        );
      } else if (convenio_medico.length > 50) {
        throw new Error(
          "O convênio médico deve conter no máximo 50 caracteres.",
        );
      }

      //validacao plano_convenio
      if (!plano_convenio) {
        throw new Error("Plano de convênio é obrigatório.");
      } else if (plano_convenio.length < 3) {
        throw new Error(
          "O plano de convênio deve conter pelo menos 3 caracteres.",
        );
      } else if (plano_convenio.length > 50) {
        throw new Error(
          "O plano de convênio deve conter no máximo 50 caracteres.",
        );
      }

      //validacao tipo_sanguineo
      if (!tipo_sanguineo) {
        throw new Error("Tipo sanguíneo é obrigatório.");
      } else if (
        !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(
          tipo_sanguineo,
        )
      ) {
        throw new Error(
          "Tipo sanguíneo deve ser um dos seguintes: A+, A-, B+, B-, AB+, AB-, O+ ou O-.",
        );
      }

      //Validação do email
      if (!email) {
        throw new Error("Email é obrigatório.");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Email deve ser um endereço de email válido.");
      } else if (email.length > 255) {
        throw new Error("Email deve conter no máximo 255 caracteres.");
      }

      //Verificar se o email já está em uso
      const emailExistente = await Paciente.findOne({ where: { email } });
      if (emailExistente) {
        throw new Error("Email já está em uso por outro paciente.");
      }

      //Validação da senha
      if (!senha) {
        throw new Error("Senha é obrigatória.");
      } else if (senha.length < 6) {
        throw new Error("Senha deve conter no mínimo 6 caracteres.");
      } else if (senha.length > 50) {
        throw new Error("Senha deve conter no máximo 50 caracteres.");
      } else if (!/[A-Z]/.test(senha)) {
        throw new Error("Senha deve conter pelo menos uma letra maiúscula.");
      } else if (!/[a-z]/.test(senha)) {
        throw new Error("Senha deve conter pelo menos uma letra minúscula.");
      } else if (!/\d/.test(senha)) {
        throw new Error("Senha deve conter pelo menos um número.");
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        throw new Error("Senha deve conter pelo menos um caractere especial.");
      }
      const hashSenha = await bcrypt.hash(senha, 10);

      return await Paciente.create({
        nomeCompleto,
        data_nascimento,
        cpf,
        rg,
        genero,
        endereco,
        telefone,
        convenio_medico,
        plano_convenio,
        tipo_sanguineo,
        email,
        senha: hashSenha,
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

    const pacientes = await Paciente.findOne({ where: { email } });

    if (!pacientes) {
      throw new Error("Pacientes não encontrado");
    }

    const hashSenha = await bcrypt.hash(senhaNova, 10);
    await Paciente.update({ senha: hashSenha }, { where: { email } });
    return await Paciente.findOne({
      where: { email },
      attributes: { exclude: ["senha"] },
    });
  },

  getById: async (id) => {
    try {
      const pacientes = await Paciente.findByPk(id);
      if (!pacientes) {
        throw new Error("Paciente não encontrado!");
      }
      return await Paciente.findByPk(id, {
        attributes: { exclude: ["senha"] },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAll: async () => {
    try {
      return await Paciente.findAll({
        attributes: { exclude: ["senha"] },
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  },

  update: async (id, atualizacao) => {
    try {
      const pacientes = await Paciente.findByPk(id);
      if (!pacientes) {
        throw new Error("Pacientes não encontrado.");
      }

      //Validação do nome completo
      if (atualizacao.nomeCompleto && atualizacao.nomeCompleto.length < 3) {
        throw new Error("O nome completo deve conter pelo menos 3 caracteres.");
      } else if (atualizacao.nomeCompleto.length > 255) {
        throw new Error(
          "O nome completo deve conter no máximo 255 caracteres.",
        );
      } else if (!/^[a-zA-Z\s]+$/.test(atualizacao.nomeCompleto)) {
        throw new Error("O nome completo deve conter apenas letras e espaços.");
      } else if (/\d/.test(atualizacao.nomeCompleto)) {
        throw new Error("O nome completo não deve conter números.");
      } else if (/[!@#$%^&*(),.?":{}|<>]/.test(atualizacao.nomeCompleto)) {
        throw new Error(
          "O nome completo não deve conter caracteres especiais.",
        );
      } else if (/\s{2,}/.test(atualizacao.nomeCompleto)) {
        throw new Error(
          "O nome completo não deve conter múltiplos espaços consecutivos.",
        );
      } else if (atualizacao.nomeCompleto.trim().length === 0) {
        throw new Error(
          "O nome completo não deve ser vazio ou conter apenas espaços.",
        );
      } else if (!atualizacao.nomeCompleto) {
        throw new Error("O nome completo é obrigatório.");
      }

      //Validação da data de nascimento
      if (atualizacao.data_nascimento.toString().length < 10) {
        throw new Error(
          "A data de nascimento deve ter no mínimo 10 caracteres (formato: YYYY-MM-DD).",
        );
      } else if (atualizacao.data_nascimento > new Date()) {
        throw new Error("A data de nascimento deve ser no passado.");
      } else if (!atualizacao.data_nascimento) {
        throw new Error("A data de nascimento é obrigatória.");
      }

      //Validação do CPF
      if (!atualizacao.cpf) {
        throw new Error("CPF é obrigatório.");
      } else if (!/^\d{11}$/.test(atualizacao.cpf)) {
        throw new Error("CPF deve conter exatamente 11 dígitos numéricos.");
      } else if (/\D/.test(atualizacao.cpf)) {
        throw new Error("CPF deve conter apenas dígitos numéricos.");
      } else if (atualizacao.cpf.length !== 11) {
        throw new Error("CPF deve conter exatamente 11 dígitos.");
      } else if (
        atualizacao.cpf.split("").every((char) => char === atualizacao.cpf[0])
      ) {
        throw new Error("CPF não pode conter todos os dígitos iguais.");
      }
      const cpfExistente = await Paciente.findOne({
        where: { cpf: atualizacao.cpf },
      });
      if (cpfExistente && cpfExistente.id !== id) {
        throw new Error("CPF já está em uso por outro paciente.");
      }

      //validação do RG
      if (!atualizacao.rg) {
        throw new Error("RG é obrigatório.");
      } else if (!/^\d{9}$/.test(atualizacao.rg)) {
        throw new Error("RG deve conter exatamente 9 dígitos numéricos.");
      } else if (/\D/.test(atualizacao.rg)) {
        throw new Error("RG deve conter apenas dígitos numéricos.");
      } else if (atualizacao.rg.length !== 9) {
        throw new Error("RG deve conter exatamente 9 dígitos.");
      } else if (
        atualizacao.rg.split("").every((char) => char === atualizacao.rg[0])
      ) {
        throw new Error("RG não pode conter todos os dígitos iguais.");
      }
      const rgExistente = await Paciente.findOne({
        where: { rg: atualizacao.rg },
      });
      if (rgExistente && rgExistente.id !== id) {
        throw new Error("RG já está em uso por outro paciente.");
      }

      //validação do gênero
      if (!atualizacao.genero) {
        throw new Error("Gênero é obrigatório.");
      } else if (
        !["Masculino", "Feminino", "Outro"].includes(atualizacao.genero)
      ) {
        throw new Error("Gênero deve ser 'Masculino', 'Feminino' ou 'Outro'.");
      }

      //Validação do endereço
      if (!atualizacao.endereco) {
        throw new Error("Endereço é obrigatório.");
      } else if (atualizacao.endereco.length < 5) {
        throw new Error("O endereço deve conter pelo menos 5 caracteres.");
      } else if (atualizacao.endereco.length > 255) {
        throw new Error("O endereço deve conter no máximo 255 caracteres.");
      }

      //Validação do telefone
      if (!atualizacao.telefone) {
        throw new Error("Telefone é obrigatório.");
      } else if (!/^\d{10,11}$/.test(atualizacao.telefone)) {
        throw new Error(
          "Telefone deve conter 10 ou 11 dígitos numéricos (com DDD).",
        );
      } else if (/\D/.test(atualizacao.telefone)) {
        throw new Error("Telefone deve conter apenas dígitos numéricos.");
      } else if (
        atualizacao.telefone.length < 10 ||
        atualizacao.telefone.length > 11
      ) {
        throw new Error("Telefone deve conter 10 ou 11 dígitos.");
      }

      //validacao convenio_medico
      if (!atualizacao.convenio_medico) {
        throw new Error("Convênio médico é obrigatório.");
      } else if (atualizacao.convenio_medico.length < 3) {
        throw new Error(
          "O convênio médico deve conter pelo menos 3 caracteres.",
        );
      } else if (atualizacao.convenio_medico.length > 50) {
        throw new Error(
          "O convênio médico deve conter no máximo 50 caracteres.",
        );
      }

      //validacao plano_convenio
      if (!atualizacao.plano_convenio) {
        throw new Error("Plano de convênio é obrigatório.");
      } else if (atualizacao.plano_convenio.length < 3) {
        throw new Error(
          "O plano de convênio deve conter pelo menos 3 caracteres.",
        );
      } else if (atualizacao.plano_convenio.length > 50) {
        throw new Error(
          "O plano de convênio deve conter no máximo 50 caracteres.",
        );
      }

      //validacao tipo_sanguineo
      if (!atualizacao.tipo_sanguineo) {
        throw new Error("Tipo sanguíneo é obrigatório.");
      } else if (
        !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(
          atualizacao.tipo_sanguineo,
        )
      ) {
        throw new Error(
          "Tipo sanguíneo deve ser um dos seguintes: A+, A-, B+, B-, AB+, AB-, O+ ou O-.",
        );
      }

      //Validação do email
      if (!atualizacao.email) {
        throw new Error("Email é obrigatório.");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(atualizacao.email)) {
        throw new Error("Email deve ser um endereço de email válido.");
      } else if (atualizacao.email.length > 255) {
        throw new Error("Email deve conter no máximo 255 caracteres.");
      }
      if (atualizacao.email) {
        const emailExistente = await Paciente.findOne({
          where: { email: atualizacao.email },
        });
        if (emailExistente && emailExistente.id !== id) {
          throw new Error("Email já cadastrado por outro paciente.");
        }
      }

      //Validação da senha
      if (!senha) {
        throw new Error("Senha é obrigatória.");
      } else if (senha.length < 6) {
        throw new Error("Senha deve conter no mínimo 6 caracteres.");
      } else if (senha.length > 50) {
        throw new Error("Senha deve conter no máximo 50 caracteres.");
      } else if (!/[A-Z]/.test(senha)) {
        throw new Error("Senha deve conter pelo menos uma letra maiúscula.");
      } else if (!/[a-z]/.test(senha)) {
        throw new Error("Senha deve conter pelo menos uma letra minúscula.");
      } else if (!/\d/.test(senha)) {
        throw new Error("Senha deve conter pelo menos um número.");
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        throw new Error("Senha deve conter pelo menos um caractere especial.");
      }
      if (atualizacao.senha) {
        const hashSenha = await bcrypt.hash(atualizacao.senha, 10);
        atualizacao.senha = hashSenha;
      }

      await Paciente.update(atualizacao, { where: { id } });
      return await Paciente.findByPk(id, {
        attributes: { exclude: ["senha"] },
      });
    } catch (error) {
      throw new Error(error.message || "Erro ao atualizar paciente.");
    }
  },

  delete: async (id) => {
    try {
      const pacientesDeletado = await Paciente.findByPk(id);
      if (!pacientesDeletado) {
        throw new Error("Pacientes não encontrado.");
      }

      /* await Agendamento.destroy({
        where: { Pacientes_id: id },
      }); */

      await pacientesDeletado.destroy();
      return { msg: "Pacientes removido com sucesso." };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = PacientesService;
