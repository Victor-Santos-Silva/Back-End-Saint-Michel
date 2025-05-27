const express = require('express');
const router = express.Router();
const agendamentoDependenteController = require('../controller/agendamentoDependenteController.js');

router.post('/', agendamentoDependenteController.create);
router.get('/', agendamentoDependenteController.getAll);
router.get('/agendamentoGeralDependente', agendamentoDependenteController.listarAgendamentosDependente);
router.get('/:id', agendamentoDependenteController.getById);
router.put('/:id', agendamentoDependenteController.update);
router.delete('/:id', agendamentoDependenteController.delet);

module.exports = router;