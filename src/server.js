require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./models");
const { Router } = require("express");
const router = Router();
const app = express();

// Rotas principais
const routes = require("./router/router");
const notificacaoPacienteRouter = require("./router/notificacaoPacienteRouter");
const notificationRoutes = require("./router/notificationRoutes");
const chatbotRoutes = require("./router/chatbotRoutes"); // 🔹 Chatbot

// Middlewares
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
app.use('/public', express.static(path.join(__dirname, 'public'))); // Caso use pasta public

// 🔹 Rotas do chatbot
app.use('/api/chatbot', chatbotRoutes);

// 🔹 Suas rotas existentes
app.use('/notificacoes', notificationRoutes);
app.use('/notificacoes-paciente', notificacaoPacienteRouter);
app.use('/', routes);

router.get('/', (req, res) => {
  res.send('API Saint Michel está rodando!');
});

// Banco de dados e inicialização
sequelize
    .authenticate()
    .then(async () => {
        console.log("Conexão com o banco de dados bem-sucedida!");
        const PORT = process.env.PORT || 5100;
        app.listen(PORT, () => {
            console.log("---------------------------");
            console.log(`Servidor rodando em http://localhost:${PORT}`);
            console.log("---------------------------");
        });
    })
    .catch((err) => {
        console.error("Erro ao conectar ao banco de dados:", err);
    });
