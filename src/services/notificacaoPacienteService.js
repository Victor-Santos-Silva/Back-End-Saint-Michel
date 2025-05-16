const NotificacaoPaciente = require("../models/notificacaoPaciente");

class NotificacaoPacienteService {
  async criarNotificacao(email, title, message) {
    return await NotificacaoPaciente.create({ email, title, message });
  }

  async buscarPorEmail(email) {
    return await NotificacaoPaciente.findAll({ 
      where: { email },
      order: [['createdAt', 'DESC']] 
    });
  }

  async marcarComoLida(id) {
    return await NotificacaoPaciente.update(
      { lida: true },
      { where: { id } }
    );
  }

  async deletarNotificacao(id) {
    return await NotificacaoPaciente.destroy({ where: { id } });
  }
}

module.exports = new NotificacaoPacienteService();