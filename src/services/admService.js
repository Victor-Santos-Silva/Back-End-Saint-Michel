const { Administrador } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const admService = {
  // login e esqueci senha
  login: async (login) => {
    const { email, senha } = login;

    if (!email || !senha) {
      throw new Error("Email e senha são obrigatórios.");
    }

    const admin = await Administrador.findOne({ where: { email } });

    if (!admin) {
      throw new Error("Email ou senha incorretos.");
    }

    const senhaIsValid = await bcrypt.compare(senha, admin.senha);
    if (!senhaIsValid) {
      throw new Error("Email ou senha incorretos.");
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, nome: admin.nome },
      process.env.SECRET,
      { expiresIn: "1h" },
    );

    return {
      token,
      nome: admin.nome,
      id: admin.id,
    };
  },

  esqueciSenha: async (email, novaSenha) => {
    try {
      // Primeiro busca o admin pelo email
      const admin = await Administrador.findOne({ where: { email } });

      if (!admin) {
        throw new Error("Adm não encontrado");
      }

      // Verifica se a nova senha tem pelo menos 6 caracteres
      if (novaSenha.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres");
      }

      const hashSenha = await bcrypt.hash(novaSenha, 10);
      await admin.update({ senha: hashSenha });
      return admin;
    } catch (error) {
      throw error;
    }
  },

  // CRUD
  create: async (cadastro) => {
    try {
      const { nome, email, senha } = cadastro;

      const hashSenha = await bcrypt.hash(senha, 10);

      const adminExistente = await Administrador.findOne({ where: { email } });
      if (adminExistente) {
        throw new Error("Email já cadastrado.");
      }

      if (!nome || !email || !senha) {
        throw new Error("Todos os campos são obrigatórios.");
      }

      return await Administrador.create({
        nome,
        email,
        senha: hashSenha,
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (id, adminToUpdate) => {
    try {
      const admin = await Administrador.findByPk(id);
      if (!admin) {
        throw new Error("Adm não encontrado.");
      }

      if (adminToUpdate.senha) {
        const hashSenha = await bcrypt.hash(adminToUpdate.senha, 10);
        adminToUpdate.senha = hashSenha;
      }

      await admin.update(adminToUpdate);
      return admin;
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const admin = await Administrador.findByPk(id, {
        attributes: { exclude: ["senha"] },
      });
      if (!admin) {
        throw new Error("Administrador não encontrado.");
      }

      return admin;
    } catch (error) {
      throw error;
    }
  },
  getAll: async () => {
    try {
      return await Administrador.findAll({
        attributes: { exclude: ["senha"] },
      });
    } catch (error) {
      throw new Error("Ocorreu um erro ao buscar todos os admins");
    }
  },
  delete: async (id) => {
    try {
      const user = await Administrador.findByPk(id);
      if (!user) {
        throw new Error("Administrador não encontrado.");
      }
      await user.destroy();
      return user;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = admService;
