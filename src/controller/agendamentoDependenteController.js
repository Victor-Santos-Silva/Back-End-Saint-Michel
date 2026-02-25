const AgendamentoDependente = require("../models/AgendamentoDependente.js");
const Medico = require("../models/Medico.js");
const Paciente = require("../models/Pacientes.js");
const Dependente = require("../models/Dependente.js");

const agendamentoController = {
  async create(req, res) {
    try {
      const {
        paciente_id,
        especialidade,
        medico_id,
        dependente_id,
        data,
        hora,
      } = req.body;
      const agendamento = await AgendamentoDependente.create({
        paciente_id,
        especialidade,
        medico_id,
        dependente_id,
        data,
        hora,
      });
      res
        .status(201)
        .json({ message: "Agendamento criado com sucesso", agendamento });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar agendamento", error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const agendamentos = await AgendamentoDependente.findAll();
      res.status(200).json(agendamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.error("Erro ao listar agendamento:", error);
    }
  },

  async update(req, res) {
    try {
      const { medico_id } = req.query;
      let agendamentos;
      if (medico_id) {
        agendamentos = await AgendamentoDependente.findAll({
          where: { medico_id: medico_id },
        });
      } else {
        agendamentos = await AgendamentoDependente.findAll();
      }
      res.status(200).json(agendamentos);
    } catch (error) {
      console.error("Erro ao listar agendamentos:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const agendamento = await AgendamentoDependente.findByPk(id, {
        include: [{ model: Paciente }, { model: Dependente }],
      });

      if (!agendamento) {
        return res.status(404).json({ message: "Agendamento não encontrado" });
      }

      res.status(200).json({
        AgendamentoDependente: agendamento,
      });
    } catch (error) {
      console.error("Erro ao obter agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async delet(req, res) {
    try {
      const { id } = req.params;
      const agendamento = await AgendamentoDependente.findByPk(id);
      if (!agendamento) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
      }
      await agendamento.destroy();
      res.status(200).json({ message: "Agendamento deletado com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async listarAgendamentosDependente(req, res) {
    try {
      const { medico_id } = req.query;
      let agendamentoDependente;

      if (medico_id) {
        agendamentoDependente = await AgendamentoDependente.findAll({
          where: { medico_id: medico_id },
          include: [{ model: Paciente }, { model: Dependente }], // Apenas incluir relacionamentos válidos
        });
      } else {
        agendamentoDependente = await AgendamentoDependente.findAll({
          include: [{ model: Paciente }], // Incluir o paciente sempre
        });
      }

      res.status(200).json({ agendamentoDependente: agendamentoDependente });
    } catch (error) {
      console.error("Erro ao listar agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = agendamentoController;
