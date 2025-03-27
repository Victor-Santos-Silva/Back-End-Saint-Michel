
// Importa o dotenv para carregar as variáveis de ambiente
require("dotenv").config();

// Importa o express para criar o servidor
const express = require("express");

// Importa o cors para permitir requisições de outros domínios
const cors = require("cors");

// Importa as rotas do arquivo router.js
const routes = require("./router/router");

// Importa o path para lidar com caminhos de arquivos
const path = require("path");

// Importa o sequelize para conectar ao banco de dados
const { sequelize } = require("./models");

// Cria uma instância do express
const app = express();

// Usa o cors para permitir requisições de outros domínios
app.use(cors());

// Usa o express.json para lidar com requisições em JSON
app.use(express.json());

// Usa o express.urlencoded para lidar com requisições em URL-encoded
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usa as rotas do arquivo router.js
app.use("/", routes);

// Conecta ao banco de dados e inicia o servidor
sequelize
    .authenticate()
    .then(async () => {
        console.log("Conexão com o banco de dados bem-sucedida!");
        const PORT = process.env.PORT || 5500;
        app.listen(PORT, () => {
            console.log("---------------------------");
            console.log(`Servidor rodando em http://localhost:${PORT}`);
            console.log("---------------------------");
        });
    })
    .catch((err) => {
        console.error("Erro ao conectar ao banco de dados:", err);
    });