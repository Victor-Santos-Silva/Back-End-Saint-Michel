const admService = require("../services/admService");

const admController = {
  login: async (req, res) => {
    try {
      const result = await admService.login(req.body);
      return res.status(200).json({
        msg: "Login realizado com sucesso",
        result,
      });
    } catch (error) {
      return res.status(401).json({
        error: error.message,
      });
    }
  },

  create: async (req, res) => {
    try {
      const novoCadastroAdm = await admService.create(req.body);
      res.status(201).json({
        mensagem: "Admin criado com sucesso.",
        data: novoCadastroAdm,
      });
    } catch (error) {
      console.error("Erro no controller:", error.mensagem);

      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          error:
            "Erro de validação: " +
            error.errors.map((err) => err.message).join(", "),
        });
      }
      res.status(500).json({ error: "Erro interno no servidor." });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const atualizacaoAdm = req.body;
      const admAtualizado = await admService.update(id, atualizacaoAdm);
      res.status(200).json(admAtualizado);
    } catch (error) {
      return res.status(500).json({
        msg: "Erro ao atualizar o admin",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const admins = await admService.getAll();
      return res.status(200).json({
        msg: "Todos os admins!",
        admins,
      });
    } catch (error) {
      return res.status(200).json({
        msg: "Ocorreu um erro no servidor",
      });
    }
  },

  getOne: async (req, res) => {
    try {
      const admin = await admService.getById(req.params.id);
      if (!admin) {
        return res.status(400).json({
          msg: "Admin nao encontrado!",
        });
      }
      return res.status(200).json({
        msg: "Admin encontrado",
        admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no servidor",
      });
    }
  },

  delete: async (req, res) => {
    try {
      const admin = await admService.delete(req.params.id);
      if (!admin) {
        return res.status(400).json({
          msg: "Admin nao encontrado",
        });
      }
      return res.status(200).json({
        msg: "Admin deletado com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no servidor",
      });
    }
  },
};

module.exports = admController;
