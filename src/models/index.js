const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');
const Usuarios = require("../models/Usuario.js");
const Agendamento = require("../models/Agendamento.js");
const AgendamentoDocente = require('./agendamentoDocente.js');
const Prontuario = require('./Prontuario.js');
const Medico = require('./medico.js');
const ProntuarioDocente = require('./ProntuarioDocente.js');
const Dependente = require('./DependenteAdicionado.js');
const AgendamentoDependente = require('./AgendamentoDependente.js');
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

Prontuario.belongsTo(Usuarios, { foreignKey: 'usuario_id' }); 
Usuarios.hasMany(Prontuario, { foreignKey: 'usuario_id' });

Agendamento.belongsTo(Medico, { foreignKey: 'medico_id' });
Medico.hasMany(Agendamento, { foreignKey: 'medico_id' });

Prontuario.belongsTo(Agendamento, { foreignKey: 'agendamento_id' });
Agendamento.hasOne(Prontuario, { foreignKey: 'agendamento_id' });

ProntuarioDocente.belongsTo(AgendamentoDocente, { foreignKey: 'agendamento_id' });
AgendamentoDocente.hasOne(ProntuarioDocente, { foreignKey: 'agendamento_id' });

Dependente.belongsTo(Usuarios, { foreignKey: 'usuario_id' });
Usuarios.hasMany(Dependente, { foreignKey: 'usuario_id' });

AgendamentoDependente.belongsTo(Usuarios, { foreignKey: 'usuario_id' });
Usuarios.hasMany(AgendamentoDependente, { foreignKey: 'usuario_id' });

sequelize.sync();

module.exports = { sequelize, ...db };