const express = require('express');
const router = express.Router();
const duvidasController = require('../controller/duvidasController');

// Rotas CRUD
router.post('/', duvidasController.criar);
router.get('/', duvidasController.listarTodos);
router.get('/:id', duvidasController.buscarPorId);
router.put('/:id', duvidasController.atualizar);
router.delete('/:id', duvidasController.deletar);

// Rota adicional de busca
router.get('/buscar', duvidasController.buscarPorTermo);

module.exports = router;