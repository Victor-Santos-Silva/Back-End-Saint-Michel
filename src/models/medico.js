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
            isDate: { msg: "Data de nascimento inválida." },
            isValidDate(value) {
                const data = new Date(value);
                const hoje = new Date();
                const idade = hoje.getFullYear() - data.getFullYear();

                if (data > hoje) throw new Error("A data de nascimento não pode ser no futuro.");
                if (idade < 21) throw new Error("O médico deve ter no mínimo 21 anos.");
            }
        }
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
        validate: {
            notEmpty: { msg: "O endereço não pode estar vazio." }
        }
    },
    especialidade: {
        type: DataTypes.ENUM(
            'Ortopedista',
            'Proctologista',
            'Oncologista',
            'Otorrinolaringologista',
            'Oftalmologista',
            'Cardiologista',
            'Pneumologista',
            'Nefrologista',
            'Gastroenterologista',
            'Urologista',
            'Dermatologista',
            'Ginecologista',
        ),
        allowNull: false,
        validate: {
            notEmpty: { msg: "A especialidade não pode estar vazio." }
        }
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
        len: { args: [6, 100], msg: "A senha deve ter no mínimo 6 caracteres." }
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
