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
      const novoAdm = await admService.create(req.body);
      res.status(201).json({
        mensagem: "Admin criado com sucesso.",
        data: novoAdm,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
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
        msg: error.message,
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
        msg: error.message,
      });
    }
  },

  getOne: async (req, res) => {
    try {
      const admin = await admService.getById(req.params.id);
      return res.status(200).json({
        msg: "Admin encontrado",
        admin,
      });
    } catch (error) {
      return res.status(404).json({
        msg: error.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const admin = await admService.delete(req.params.id);
      return res.status(200).json({
        msg: "Admin deletado com sucesso!",
        admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },
};

module.exports = admController;
