const express = require('express');
const agendamentoDocenteController = require('../controller/agendamentoDocenteController');
const router = express.Router();

router.post('/agendarDocente', agendamentoDocenteController.criarAgendamento);
router.get('/listar', agendamentoDocenteController.listarAgendamentosDocente);
router.get('/:id', agendamentoDocenteController.obterAgendamentoDocente);
router.put('/:id', agendamentoDocenteController.atualizarAgendamentoDocente);
router.delete('/:id', agendamentoDocenteController.deletarAgendamentoDocente);

module.exports = router;