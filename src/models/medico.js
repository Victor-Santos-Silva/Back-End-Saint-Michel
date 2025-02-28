const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Medico = sequelize.define("Medico", {
    nome_completo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    crm: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    especialidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nacionalidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_corporativo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha_corporativa: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    foto: {
        type: DataTypes.STRING, // Apenas o caminho do arquivo
        allowNull: true
    }

    
});

module.exports = Medico