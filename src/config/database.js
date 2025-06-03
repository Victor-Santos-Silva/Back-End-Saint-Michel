const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
       /*  dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true, // Obrigatório para Azure SQL
                trustServerCertificate: false, // Correto para produção
            }
        } */
    }
);
module.exports = sequelize;