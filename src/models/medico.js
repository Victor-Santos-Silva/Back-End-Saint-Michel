const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Medico = sequelize.define("Medico", {
    nome_completo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "O nome completo não pode estar vazio." },
        },
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: { args: [18], msg: "A idade deve ser maior ou igual a 18 anos." },
        },
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: { args: [11, 11], msg: "O CPF deve ter 11 dígitos." },
            isNumeric: { msg: "O CPF deve conter apenas números." },
        },
    },
    crm: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: { args: [10, 11], msg: "O telefone deve ter 10 ou 11 dígitos." },
        },
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
        unique: true,
        validate: {
            isEmail: { msg: "Informe um email válido." },
        },
    },
    senha_corporativa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING, // Apenas o caminho do arquivo
        allowNull: true,
    },
}, {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    tableName: "medicos", // Nome explícito da tabela
});

module.exports = Medico;
