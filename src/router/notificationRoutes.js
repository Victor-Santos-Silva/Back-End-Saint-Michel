const express = require('express');
const router = express.Router();
 
router.get('/', (req, res) => {
  res.json({ message: 'Notificações funcionando!' });
});
 
router.post('/notificacao', (req, res) => {
  res.json({ message: 'Notificações enviada' });
});
 
module.exports = router;