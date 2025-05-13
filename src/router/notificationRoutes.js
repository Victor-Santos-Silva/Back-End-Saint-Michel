
const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificacaoController');

router.get('/notificacoes/:user_id', notificationController.list);

router.post('/notificacoes', notificationController.create);

router.patch('/notificacoes/:id/marcar-como-lida', notificationController.markRead);

router.delete('/notificacoes/:id', notificationController.remove);

module.exports = router;