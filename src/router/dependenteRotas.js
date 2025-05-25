const express = require('express');
const router = express.Router();
const dependenteController = require('../controller/dependenteController.js');

router.post('/', dependenteController.create);
router.get('/', dependenteController.getAll);
router.get('/:id', dependenteController.getById);
router.put('/:id', dependenteController.update);
router.delete('/:id', dependenteController.delet);
router.get('/dependenteAdicionado/:usuario_id', dependenteController.buscarPorUsuarioId);
module.exports = router;