const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AgendamentoDocente = sequelize.define('AgendamentoDocente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[0-9]+$/, 
            len: [11, 11]   
        }
    },
    hora: {
        type: DataTypes.TIME,
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
}, {
    tableName: 'agendamentodocentes',
    timestamps: false
});

module.exports = AgendamentoDocente;
