require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./router/router");
const path = require("path");
const { sequelize } = require("./models");
const app = express();


app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));




app.use('/notificacoes', require('./router/notificationRoutes'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
app.use("/", routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);

    sequelize.authenticate()
        .then(() => {
            console.log("Conexão com o banco de dados bem-sucedida!");
        })
        .catch((err) => {
            console.error("Erro ao conectar ao banco de dados:", err);
        });
});

