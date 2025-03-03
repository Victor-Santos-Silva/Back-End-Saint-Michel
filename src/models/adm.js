const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AdmModel = sequelize.define("Adm", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'E-mail inválido'
            }
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true
});

module.exports = AdmModel;