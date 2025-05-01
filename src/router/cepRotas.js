const express = require('express');
const router = express.Router();
const cepController = require('../controller/cepController');

// Rota para buscar CEP
router.get('/:cep', cepController.buscarCEP);

// Rota adicional para documentação
router.get('/', (req, res) => {
    res.json({
        message: 'API de Consulta de CEP',
        instrucoes: {
            metodo: 'GET',
            formato: '/cep/[numero-do-cep]',
            exemplos: [
                'http://localhost:5000/cep/01001000',
                'http://localhost:5000/cep/01001-000'
            ],
            observacao: 'O CEP pode ser enviado com ou sem hífen'
        }
    });
});

module.exports = router;