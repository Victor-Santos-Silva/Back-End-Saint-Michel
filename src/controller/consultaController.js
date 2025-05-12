const consultaService = require('../services/consultaService.js');

// usuario
exports.concluirConsulta = async (req, res) => {
  try {
    const data = await consultaService.concluirConsulta(req.body);
    res.status(200).json({
      message: data.message,
      statusAgendamento: 'finalizado'
    });
  } catch (error) {
    console.error("Erro ao concluir consulta:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.naoCompareceu = async (req, res) => {
  try {
    await consultaService.marcarComoNaoCompareceu(req.body.agendamento_id);
    res.status(200).json({ message: 'Paciente marcado como não compareceu' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarHistorico = async (req, res) => {
  try {
    const historico = await consultaService.listarHistorico();
    res.status(200).json(historico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
