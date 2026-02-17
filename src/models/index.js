const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');
const Usuarios = require("../models/Usuario.js");
const Agendamento = require("../models/Agendamento.js");
const AgendamentoTitular = require('./AgendamentoTitular.js');
const Prontuario = require('./Prontuario.js');
const Medico = require('./Medico.js');
const ProntuarioTitular = require('./ProntuarioTitular.js');
const Dependente = require('./DependenteAdicionado.js');
const AgendamentoDependente = require('./AgendamentoDependente.js');
const ProntuarioDependente = require('./ProntuarioDependente.js');
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
Usuarios.hasMany(Agendamento, { foreignKey: 'usuario_id' });

AgendamentoTitular.belongsTo(Usuarios, { foreignKey: 'usuario_id' });
Usuarios.hasMany(AgendamentoTitular, { foreignKey: 'usuario_id' });

Prontuario.belongsTo(Usuarios, { foreignKey: 'usuario_id' });
Usuarios.hasMany(Prontuario, { foreignKey: 'usuario_id' });

Agendamento.belongsTo(Medico, { foreignKey: 'medico_id' });
Medico.hasMany(Agendamento, { foreignKey: 'medico_id' });

Prontuario.belongsTo(Agendamento, { foreignKey: 'agendamento_id' });
Agendamento.hasOne(Prontuario, { foreignKey: 'agendamento_id' });

ProntuarioTitular.belongsTo(AgendamentoTitular, { foreignKey: 'agendamento_id' });
AgendamentoTitular.hasOne(ProntuarioTitular, { foreignKey: 'agendamento_id' });

Dependente.belongsTo(Usuarios, { foreignKey: 'usuario_id' });
Usuarios.hasMany(Dependente, { foreignKey: 'usuario_id' });

AgendamentoDependente.belongsTo(Usuarios, { foreignKey: 'usuario_id' });
Usuarios.hasMany(AgendamentoDependente, { foreignKey: 'usuario_id' });

AgendamentoDependente.belongsTo(Dependente, { foreignKey: 'dependente_id' });
Dependente.hasMany(AgendamentoDependente, { foreignKey: 'dependente_id' });

ProntuarioDependente.belongsTo(AgendamentoDependente, { foreignKey: 'agendamento_id' });
AgendamentoDependente.hasOne(ProntuarioDependente, { foreignKey: 'agendamento_id' });

ProntuarioDependente.belongsTo(Usuarios, { foreignKey: 'usuario_id' });
Usuarios.hasMany(ProntuarioDependente, { foreignKey: 'usuario_id' });


sequelize.sync();

module.exports = { sequelize, ...db };