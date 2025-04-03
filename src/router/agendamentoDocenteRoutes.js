const express = require('express');
const agendamentoDocenteController = require('../controller/agendamentoDocenteController');
const authenticateToken = require("../middlewares/authenticateToken.js");
const router = express.Router();

router.post('/agendarDocente', authenticateToken, agendamentoDocenteController.criarAgendamentoDocente);
router.get('/agendamentoGeralDocente', agendamentoDocenteController.listarAgendamentosDocente);
router.get('/:id', agendamentoDocenteController.obterAgendamentoDocente);
router.put('/:id', agendamentoDocenteController.atualizarAgendamentoDocente);
router.delete('/:id', agendamentoDocenteController.deletarAgendamentoDocente);

module.exports = router;