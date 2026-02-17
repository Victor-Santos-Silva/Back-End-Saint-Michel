const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AgendamentoTitular = sequelize.define('AgendamentoTitular', {
    usuario_id: { // Quem fez o AgendamentoTitular
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
    },
    medico_id: { // Médico que atenderá
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'medicos', key: 'id' }
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },

    nomeCompleto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataDeNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [7, 10] }
    },
    genero: {
        type: DataTypes.ENUM('Masculino', 'Feminino', 'Outro'),
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 11],
            isNumeric: true
        }
    },
    convenioMedico: {
        type: DataTypes.STRING,
        allowNull: true
    },
    planoConvenio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    etnia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    problema_saude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parentesco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipoSanguineo: {
        type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
        allowNull: true
    },
    imagemGenero: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pendente', 'finalizado', 'nao_compareceu'),
        allowNull: false,
        defaultValue: 'pendente'
    }
}, {
    timestamps: true
});

module.exports = AgendamentoTitular;