const { Router } = require("express");
const usuarioController = require("../controller/usuarioController.js");
const authenticateToken = require("../middlewares/authenticateToken.js");
const router = Router();

router.post('/cadastro', usuarioController.create);

router.post('/login', usuarioController.login)

router.get('/', authenticateToken, usuarioController.getAll);

router.get('/:id', authenticateToken, usuarioController.getOne);

module.exports = router;