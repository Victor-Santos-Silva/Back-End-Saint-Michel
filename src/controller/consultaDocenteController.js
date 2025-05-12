const consultaDocenteService = require('../services/consultaDocenteService.js');

//parente
exports.concluirConsultaParente = async (req, res) => {
  try {
    const data = await consultaDocenteService.concluirConsultaParente(req.body);
    res.status(200).json({
      message: data.message,
      status: 'finalizado'
    });
  } catch (error) {
    console.error("Erro ao concluir consulta:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.naoCompareceuParente = async (req, res) => {
  try {
    await consultaDocenteService.marcarComoNaoCompareceuParente(req.body.agendamento_id);
    res.status(200).json({ message: 'Paciente marcado como não compareceu' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarHistoricoParente = async (req, res) => {
  try {
    const historico = await consultaDocenteService.listarHistoricoParente();
    res.status(200).json(historico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};