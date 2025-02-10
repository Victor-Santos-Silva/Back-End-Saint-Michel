const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');

const db = [];

// dir -> listar os arquivos do diretorio
fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js') // user.js
    .forEach(file => {
        // capturando cada arquivo individualmente
        const model = require(path.join(__dirname, file));
        //db [ user ] = Modelo User
        db[model.name] = model;
    });
sequelize.sync();

module.exports = { sequelize, ...db };