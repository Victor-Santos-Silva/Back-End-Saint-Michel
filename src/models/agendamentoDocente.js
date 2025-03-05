const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AgendamentoDocente = sequelize.define('AgendamentoDocente', {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    medico_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    especialidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    etnia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    problema_saude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parentesco: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = AgendamentoDocente;