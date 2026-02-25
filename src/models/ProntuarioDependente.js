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
      paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Paciente",
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
    ProntuarioDependente.belongsTo(models.Paciente, {
      foreignKey: "paciente_id",
    });
  };

  return ProntuarioDependente;
};
