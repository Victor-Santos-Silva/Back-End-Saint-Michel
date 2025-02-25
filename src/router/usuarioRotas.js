const { Router } = require("express");
const usuarioController = require("../controller/usuarioController.js")
const router = Router();

router.post('/cadastro', usuarioController.create);

router.post('/login', usuarioController.login)

router.get('/', usuarioController.getAll);

router.get('/:id', usuarioController.getOne);

module.exports = router;