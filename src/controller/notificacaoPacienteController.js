const notificacaoPacienteService = require("../services/notificacaoPacienteService");
const { Notificacao } = require('../models/notificacaoPaciente');
const { createSchema } = require('../middlewares/notificacaoPacienteValidator');

class NotificacaoPacienteController {
  async criar(req, res) {
    try {
      const { email, title, message } = req.body;
      const notificacao = await notificacaoPacienteService.criarNotificacao(email, title, message);
      res.status(201).json(notificacao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listarPorEmail(req, res) {
    try {
      const { email } = req.params;
      const notificacoes = await notificacaoPacienteService.buscarPorEmail(email);
      res.json(notificacoes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async marcarComoLida(req, res) {
    try {
      const { id } = req.params;
      await notificacaoPacienteService.marcarComoLida(id);
      res.json({ message: 'Notificação marcada como lida' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await notificacaoPacienteService.deletarNotificacao(id);
      res.json({ message: 'Notificação deletada com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new NotificacaoPacienteController();