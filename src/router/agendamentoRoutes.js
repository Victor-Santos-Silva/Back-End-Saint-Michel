const express = require('express')
const agendamentoController = require("../controller/agendamentoController.js");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken.js");

router.post('/agendar', authenticateToken, agendamentoController.criarAgendamento);
router.get('/listar/todos', agendamentoController.listarAgendamentoss);
router.get('/listar', agendamentoController.listarAgendamentos);
router.get('/:id', agendamentoController.obterAgendamento);
router.put('/:id', agendamentoController.atualizarAgendamento);
router.delete('/:id', agendamentoController.deletarAgendamento);

module.exports = router;
