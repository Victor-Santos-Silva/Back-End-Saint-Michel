const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    nomeCompleto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataDeNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [11, 11], // Garante 11 caracteres
            isNumeric: true, // Apenas números
        },
    },
    rg: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genero: {
        type: DataTypes.ENUM('Masculino', 'Feminino', 'Outro'),
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 11], // Valida telefone fixo (10) ou celular (11)
            isNumeric: true, // Apenas números
        },
    },
    convenioMedico: {
        type: DataTypes.STRING,
        allowNull: true, // Pode ser nulo
    },
    tipoSanguineo: {
        type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
        allowNull: true, // Pode ser nulo
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
    imagemGenero: { // Definindo o campo para a imagem
        type: DataTypes.STRING, // Tipo STRING para armazenar o nome ou caminho da imagem
        allowNull: true, // Permite que seja nulo (caso o gênero não tenha uma imagem associada)
    }
}, {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

module.exports = Usuario;
