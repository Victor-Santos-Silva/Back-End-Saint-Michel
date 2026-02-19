module.exports = (sequelize, DataTypes) => {
  const ProntuarioDependente = sequelize.define(
    "ProntuarioDependente",
    {
      agendamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "AgendamentoDependente",
          key: "id",
        },
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Usuario",
          key: "id",
        },
      },
      problemaRelatado: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      recomendacaoMedico: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );

  ProntuarioDependente.associate = (models) => {
    ProntuarioDependente.belongsTo(models.AgendamentoDependente, {
      foreignKey: "agendamento_id",
    });
    ProntuarioDependente.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
    });
  };

  return ProntuarioDependente;
};
