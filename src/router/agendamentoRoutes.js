const express = require('express')
const agendamentoController = require("../controller/agendamentoController.js");
const router = express.Router();

router.post('/agendar', agendamentoController.criarAgendamento);
router.get('/listar', agendamentoController.listarAgendamentos);
router.get('/:id', agendamentoController.obterAgendamento);
router.put('/:id', agendamentoController.atualizarAgendamento);
router.delete('/:id', agendamentoController.deletarAgendamento);

module.exports = router;
