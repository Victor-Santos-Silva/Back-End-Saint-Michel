const agendamentoDependenteSerivce = require("../services/agendamentoDependenteService");

const agendamentoController = {
  create: async (req, res) => {
    try {
      const dados = await agendamentoDependenteSerivce.create(req.body);

      res
        .status(201)
        .json({ message: "Agendamento criado com sucesso", dados });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const agendamento = agendamentoDependenteSerivce.getAll;
      return res.status(200).json({
        msg: "Todos os agendamentos de dependentes!",
        agendamento,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const update = agendamentoDependenteSerivce.update(req.params.id);
      res.status(200).json({
        mgs: "Medico atualizado com sucesso.",
        update,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const result = agendamentoDependenteSerivce.getById(req.params.id);
      res.status(200).json({
        AgendamentoDependente: result,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const result = agendamentoDependenteSerivce.delete(req.params.id);
      res
        .status(200)
        .json({ message: "Agendamento deletado com sucesso!", result });
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  },

  listarAgendamentosDependente: async (req, res) => {
    try {
      const result = agendamentoDependenteSerivce.listarAgendamentosDependente(
        req.query,
      );

      res.status(200).json({ agendamentoDependente: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = agendamentoController;
