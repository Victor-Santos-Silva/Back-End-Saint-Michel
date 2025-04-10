require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./router/router");
const path = require("path");
const { sequelize } = require("./models");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
app.use("/", routes);

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