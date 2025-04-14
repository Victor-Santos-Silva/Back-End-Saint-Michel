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
    dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: { msg: "Informe uma data válida." },
            isBefore: { args: new Date().toISOString(), msg: "A data de nascimento não pode ser futura." },
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
        validate: {
            // Exemplo de regex para CRM: '123456/SP'
            is: { args: /^[0-9]{6}\/[A-Z]{2}$/, msg: 'CRM inválido! Formato correto: 123456/SP' }
        },
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: { args: [10, 11], msg: "O telefone deve ter 10 ou 11 dígitos." },
            isNumeric: { msg: "O telefone deve conter apenas números." },
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
