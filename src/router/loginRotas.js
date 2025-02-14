const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController'); // Verifique se o caminho está correto!

// Definição da rota de login
router.post('/login', loginController.login);

module.exports = router;
