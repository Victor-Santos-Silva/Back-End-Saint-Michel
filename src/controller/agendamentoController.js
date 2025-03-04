const Agendamento = require("../models/Agendamento.js");


const agendamentoController = {
  async criarAgendamento(req, res) {
    try {
      const { especialidade, medico_id, data, hora } = req.body;

      // Cria o agendamento no banco de dados
      const agendamento = await Agendamento.create({
        usuario_id: req.usuarioId,
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

  async listarAgendamentos(req, res) {
    try {
      const agendamentos = await Agendamento.findAll();
      res.status(200).json(agendamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.error("Erro ao listar agendamento:", error);
    }
  },

  async obterAgendamento(req, res) {
    try {
      const { id } = req.params;
      const agendamento = await Agendamento.findByPk(id);

      if (!agendamento) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }

      res.status(200).json(agendamento);
    } catch (error) {
      console.error("Erro ao obter agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async atualizarAgendamento(req, res) {
    try {
      const { id } = req.params;
      const { departamento, profissional, data, hora, tipo_consulta, convenio, plano } = req.body;

      const agendamento = await Agendamento.findByPk(id);
      if (!agendamento) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
      }

      await Agendamento.update(
        { departamento, profissional, data, hora, tipo_consulta, convenio, plano },
        { where: { id } }
      );
      res.status(200).json({ message: "Agendamento atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
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
