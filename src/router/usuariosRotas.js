const { Router } = require("express");
const usuariosController = require("../controller/usuariosController.js")
const router = Router();

router.post('/', usuariosController.create);

router.get('/', usuariosController.getAll);

router.get('/:id', usuariosController.getOne);

module.exports = router;