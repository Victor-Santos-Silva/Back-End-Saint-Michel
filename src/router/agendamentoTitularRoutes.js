const express = require('express');
const agendamentoTitularController = require('../controller/agendamentoTitularController.js');
const authenticateToken = require("../middlewares/authenticateToken.js");
const router = express.Router();

router.post('/agendarTitular', authenticateToken, agendamentoTitularController.criarAgendamentoTitular);
router.get('/agendamentoGeralTitular', agendamentoTitularController.listarAgendamentosTitular);
router.get('/:id', agendamentoTitularController.obterAgendamentoTitular);
router.put('/:id', agendamentoTitularController.atualizarAgendamentoTitular);
router.delete('/:id', agendamentoTitularController.deletarAgendamentoTitular);

module.exports = router;