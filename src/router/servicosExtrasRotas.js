const express = require('express');
const router = express.Router();
const servicosExtrasController = require('../controller/servicosExtrasController');

// Rotas CRUD
router.post('/', servicosExtrasController.criar);
router.get('/', servicosExtrasController.listarTodos);
router.get('/:id', servicosExtrasController.buscarPorId);
router.put('/:id', servicosExtrasController.atualizar);
router.delete('/:id', servicosExtrasController.deletar);

// Rota adicional de busca
router.get('/buscar', servicosExtrasController.buscarPorTermo);

module.exports = router;