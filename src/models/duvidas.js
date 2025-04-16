// Importação correta do Sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajuste o caminho conforme sua estrutura

const Duvidas = sequelize.define("Duvidas", {
    duvidas: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "O campo 'duvidas' não pode estar vazio"
            }
        }
    }
}, {
    timestamps: true,
    tableName: 'duvidas' // Nome da tabela no banco de dados
});

module.exports = Duvidas;