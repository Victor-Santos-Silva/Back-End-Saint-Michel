require('dotenv').config();

const commonConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'mysql', // default para dev
  port: process.env.PORT || 3306,
};

module.exports = {
  development: {
    ...commonConfig,
    dialect: 'mysql', // ou outro
    port: 3306
  },
  production: {
    ...commonConfig,
    dialect: 'mssql',
    port: 1433,
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: false
      }
    }
  }
};