const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Agendamento = sequelize.define('Agendamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    medico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'medicos',
            key: 'id'
        }
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pendente', 'finalizado', 'nao_compareceu'),
        allowNull: false,
        defaultValue: 'pendente'
    }
}, {
    tableName: 'agendamentos',
    timestamps: false
});





module.exports = Agendamento;
