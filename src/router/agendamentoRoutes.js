    const express = require('express')
    const agendamentoController = require("../controller/agendamentoController.js");
    const router = express.Router();
    const authenticateToken = require("../middlewares/authenticateToken.js");

    router.post('/agendar', authenticateToken, agendamentoController.criarAgendamento);
    router.get('/agendamentosGeral', agendamentoController.listarTodosOsAgendamentos);
    router.get('/listar', agendamentoController.listarAgendamentos);
    router.get('/:id', agendamentoController.obterAgendamento);
    router.delete('/:id', agendamentoController.deletarAgendamento);

    module.exports = router;
