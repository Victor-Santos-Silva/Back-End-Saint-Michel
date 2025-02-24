const { Router } = require("express");
const usuarios = require("./cadastroRotas");
const login = require("./loginRotas");
const admRoutes = require("./admRotas"); // Atualizado para adm
const router = Router();

router.use('/cadastro', usuarios);
router.use('/auth', login);
router.use("/adm", admRoutes); // Agora o login será acessível em `/api/auth`
module.exports = router;
