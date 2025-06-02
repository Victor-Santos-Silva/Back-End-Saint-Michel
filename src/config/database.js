const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true, // Obrigatório para Azure SQL
                trustServerCertificate: false, // Correto para produção
                requestTimeout: 30000, // Timeout de 30 segundos
                connectTimeout: 30000 // Timeout de conexão
            }
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        retry: {
            max: 5, // Tentar reconectar até 5 vezes
            match: [
                'ECONNRESET',
                'ETIMEDOUT',
                'ESOCKETTIMEDOUT',
                'EHOSTUNREACH'
            ]
        },
        logging: console.log // Adicione para ver logs detalhados (remova em produção)
    }
);

// Testar a conexão
sequelize.authenticate()
    .then(() => console.log('Conexão com o Azure SQL estabelecida com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao Azure SQL:', err));

module.exports = sequelize;