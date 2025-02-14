const { Router } = require("express");
const usuarios = require("./cadastroRotas");
const login = require("./loginRotas"); // ✅ Importando a rota de login

const router = Router();

router.use('/cadastro', usuarios);
router.use('/auth', login); // ✅ Agora o login será acessível em `/api/auth`

module.exports = router;
