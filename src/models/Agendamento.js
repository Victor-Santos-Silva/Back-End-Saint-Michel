const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Agendamento = sequelize.define('Agendamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    departamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profissional: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    tipo_consulta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    convenio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plano: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'agendamentos',
    timestamps: false
});

module.exports = Agendamento;
