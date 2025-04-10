const multer = require('multer');
const path = require('path');

// Configuração do armazenamento para PDFs
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'pdfs')); // Pasta onde os PDFs serão salvos
    },
    filename: (req, file, cb) => {
        const nome = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, nome);
    }
});

// Filtro para aceitar apenas arquivos PDF
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        const erro = new Error('Tipo de arquivo inválido. Envie apenas arquivos PDF.');
        erro.status = 400;
        cb(erro, false);
    }
};

const uploadPedidoExame = multer({ storage, fileFilter });

module.exports = uploadPedidoExame;
