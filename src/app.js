require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./router/router");
const path = require("path");
const { sequelize } = require("./models");
const app = express();

// Importando as rotas
const notificacaoPacienteRouter = require("./router/notificacaoPacienteRouter");
const notificationRoutes = require("./router/notificationRoutes");

// Configurações básicas
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// Rotas
app.use('/notificacoes', notificationRoutes); // Notificações originais (por user_id)
app.use('/notificacoes-paciente', notificacaoPacienteRouter); // Novas notificações por email

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

// Rotas principais
app.use("/", routes);

// Conexão com o banco de dados e inicialização do servidor
//sequelize
//.authenticate()
//    .then(async () => {
console.log("Conexão com o banco de dados bem-sucedida!");
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("---------------------------");
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("---------------------------");
});
//   })
//    .catch((err) => {
//        console.error("Erro ao conectar ao banco de dados:", err);
//    });
