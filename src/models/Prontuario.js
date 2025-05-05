const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Prontuario = sequelize.define("Prontuario", {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    problemaRelatado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recomendacaoMedico: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: "Prontuarios",
});

module.exports = Prontuario;
