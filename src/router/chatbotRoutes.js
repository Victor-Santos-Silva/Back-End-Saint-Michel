const express = require('express');
const router = express.Router();
const chatbotController = require('../controller/chatbotController');
const multer = require('multer');

const upload = multer({ dest: 'src/uploads/' });

router.post('/chat', chatbotController.chatTexto);
router.post('/image-chat', upload.single('image'), chatbotController.chatImagem);

module.exports = router;
