const { Router } = require("express");
const cadastroController = require("../controller/cadastroController.js")
const router = Router();

router.post('/', cadastroController.create);

router.get('/', cadastroController.getAll);

router.get('/:id', cadastroController.getOne);

module.exports = router;