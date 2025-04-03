const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');
const Usuarios = require("../models/Usuario.js");
const Agendamento = require("../models/Agendamento.js");
const AgendamentoDocente = require('./agendamentoDocente.js');

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

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
}
);

Agendamento.belongsTo(Usuarios, { foreignKey: 'usuario_id' });
Usuarios.hasMany(Agendamento, { foreignKey: 'usuario_id'});

AgendamentoDocente.belongsTo(Usuarios, { foreignKey: 'usuario_id' }); 
Usuarios.hasMany(AgendamentoDocente, { foreignKey: 'usuario_id' });

sequelize.sync();

module.exports = { sequelize, ...db };