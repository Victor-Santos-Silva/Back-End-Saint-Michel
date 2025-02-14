require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./router/router');
const loginRoutes = require('./router/loginRotas');

const app = express(); // Iniciando servidor

// ✅ Middlewares
app.use(cors()); // Permitir requisições de outros domínios
app.use(express.json()); // Permitir JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Permitir formulários no corpo das requisições

// ✅ Rotas
app.use('/api/auth', loginRoutes);
app.use('/api', routes);

// ✅ Testando conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados deu certo.");
    })
    .catch(err => {
        console.log("Erro ao conectar no banco: ", err);
    });

// ✅ Iniciando servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('---------------------------');
    console.log(`Runnig on http://localhost:${PORT}`);
    console.log('---------------------------');
});
