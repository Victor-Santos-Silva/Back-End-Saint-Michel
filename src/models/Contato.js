const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Contato = sequelize.define("contatos", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true, // Valida formato de e-mail
        },
    },
    assunto: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    mensagem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Adiciona createdAt e updatedAt
});

module.exports = Contato;
