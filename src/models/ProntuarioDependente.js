const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AgendamentoDependente = require("./AgendamentoDependente");
const Usuario = require("./Usuario");

const ProntuarioDependente = sequelize.define("ProntuarioDependente", {
    agendamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AgendamentoDependente,
            key: 'id'
        }
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Usuario,
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
    timestamps: true
});

module.exports = ProntuarioDependente;
