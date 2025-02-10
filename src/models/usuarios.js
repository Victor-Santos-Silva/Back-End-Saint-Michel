const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuarios = sequelize.define('Usuarios', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING, // Alterado para STRING
        allowNull: false,
        unique: true,
        validate: {
            len: [11, 11], // Garantir que o CPF tenha 11 caracteres
        },
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Usuarios;
