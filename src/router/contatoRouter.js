const ContatoController = require('../controller/contatoController.js');
const { Router } = require('express');
const router = Router();

router.post('/', ContatoController.criar);
router.get('/listar', ContatoController.listar);
router.get('/listar/:id', ContatoController.obterPorId);

module.exports = router;