const { Router } = require("express");
const router = Router();
const usuarioController = require("../controller/usuarioController.js");

router.post('/cadastro', usuarioController.create);

router.post('/login', usuarioController.login)

router.get('/', usuarioController.getAll);

router.get('/:id', usuarioController.getOne);

router.put('/:id', usuarioController.update);

router.put('/esqueciSenha/:id', usuarioController.esqueciSenha);

router.delete('/:id', usuarioController.delete);

module.exports = router