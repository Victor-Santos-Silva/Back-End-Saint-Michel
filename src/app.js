require('dotenv').config(); // Arquivo => .env
const express = require('express');
const { sequelize } = require('./models');
const routes = require('./router/router')
const cors = require('cors');
const app = express(); // Iniciando servidor
app.use(cors())
app.use(express.json()); // Resposta via JSON


app.use('/api', routes)

sequelize.authenticate()
    .then(() => {
        console.log("Conexao com o banco de dados deu certo.");
    })
    .catch(err => {
        console.log("Erro ao conectar no banco: ", err);
    })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('---------------------------');
    console.log(`Runnig on http://${PORT}`);
    console.log('---------------------------');
});
