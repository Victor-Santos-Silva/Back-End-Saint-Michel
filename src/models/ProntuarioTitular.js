const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProntuarioDocente = sequelize.define("ProntuarioDocente", {
    agendamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'agendamentodocentes',
            key: 'id'
        }
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    problemaRelatado: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    recomendacaoMedico: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: "ProntuarioDocentes",
});

module.exports = ProntuarioDocente;
