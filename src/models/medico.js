const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Medico = sequelize.define("Medico", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    crm: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Medico