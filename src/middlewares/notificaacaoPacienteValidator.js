const { body, param } = require('express-validator');

const validacoes = {
  criar: [
    body('email').isEmail().withMessage('Email inválido'),
    body('title').notEmpty().withMessage('Título é obrigatório'),
    body('message').notEmpty().withMessage('Mensagem é obrigatória')
  ],
  marcarComoLida: [
    param('id').isInt().withMessage('ID deve ser um número inteiro')
  ],
  deletar: [
    param('id').isInt().withMessage('ID deve ser um número inteiro')
  ]
};

module.exports = validacoes;