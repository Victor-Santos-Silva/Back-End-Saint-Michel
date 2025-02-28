require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./router/router");
const medicoRotas = require("./router/medicoRotas"); // Importando as rotas dos médicos
const { sequelize } = require("./models");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imagens armazenadas no servidor
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas
app.use("/", routes);
app.use("/medico", medicoRotas); // Adicionando as rotas de médicos

// Conexão com o banco de dados
sequelize
    .authenticate()
    .then(async () => {
        console.log("✅ Conexão com o banco de dados bem-sucedida!");

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log("---------------------------");
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
            console.log("---------------------------");
        });
    })
    .catch((err) => {
        console.error("❌ Erro ao conectar ao banco de dados:", err);
    });

