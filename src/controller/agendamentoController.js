const Agendamento = require("../models/Agendamento.js");
const Paciente = require("../models/Pacientes.js");

const agendamentoController = {
  async criarAgendamento(req, res) {
    try {
      const { especialidade, medico_id, data, hora } = req.body;

      // Cria o agendamento no banco de dados
      const agendamento = await Agendamento.create({
        paciente_id: req.pacienteId,
        especialidade,
        medico_id,
        data,
        hora
      });

      res.status(201).json({ message: 'Agendamento criado com sucesso', agendamento });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar agendamento', error: error.message });
    }
  },

  async listarTodosOsAgendamentos(req, res) {
    try {
      const agendamentos = await Agendamento.findAll({
        include: [
          { model: Paciente, },
        ],
      });
      res.status(200).json(agendamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.error("Erro ao listar agendamento:", error);
    }
  },

  async listarAgendamentos(req, res) {
    try {
      const { medico_id } = req.query; // Pega o medico_id da query string
      let agendamentos;

      if (medico_id) {
        // Filtra os agendamentos pelo medico_id
        agendamentos = await Agendamento.findAll({
          where: { medico_id: medico_id },
          include: [
            { model: Paciente},
          ],
        });
      } else {
        // Se não houver medico_id, retorna todos os agendamentos
        agendamentos = await Agendamento.findAll();
      }

      // Retorna os agendamentos como resposta
      res.status(200).json(agendamentos);

    } catch (error) {
      console.error("Erro ao listar agendamentos:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async obterAgendamento(req, res) {
    try {
      const { id } = req.params;
      const agendamento = await Agendamento.findByPk(id, {
        include: [
          { model: Paciente},
        ],
      });

      if (!agendamento) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }

      res.status(200).json({
        AgendamentosPaciente: agendamento
      });
    } catch (error) {
      console.error("Erro ao obter agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async deletarAgendamento(req, res) {
    try {
      const { id } = req.params;
      const agendamento = await Agendamento.findByPk(id);

      if (!agendamento) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
      }
      await agendamento.destroy();
      res.status(200).json({ message: 'Agendamento deletado com sucesso!' });
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = agendamentoController; 
