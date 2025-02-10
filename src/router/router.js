const { Router } = require("express");
const usuarios = require("./usuariosRotas")

const router = Router();

router.use('/usuarios', usuarios);

module.exports = router;