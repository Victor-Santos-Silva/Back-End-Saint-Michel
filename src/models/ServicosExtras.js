// models/ServicosExtras.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ServicosExtras = sequelize.define("ServicosExtras", {
    tipoDeServico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    servicoExtra: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY, // DATEONLY para armazenar apenas a data (sem hora)
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME, // TIME para armazenar apenas a hora
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: true,
    tableName: "servicos_extras",
});

module.exports = ServicosExtras;