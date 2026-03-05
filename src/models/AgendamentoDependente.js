module.exports = (sequelize, DataTypes) => {
  const AgendamentoDependente = sequelize.define(
    "AgendamentoDependente",
    {
      paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "pacientes",
          key: "id",
        },
      },
      medico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "medico",
          key: "id",
        },
      },
      dependente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "dependentes",
          key: "id",
        },
      },
      data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hora: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pendente", "finalizado", "nao_compareceu"),
        allowNull: false,
        defaultValue: "pendente",
      },
    },
    {
      timestamps: false,
    },
  );

  AgendamentoDependente.associate = (models) => {
    AgendamentoDependente.belongsTo(models.Dependente, {
      foreignKey: "dependente_id",
    });
    AgendamentoDependente.belongsTo(models.Paciente, {
      foreignKey: "paciente_id",
    });
    AgendamentoDependente.hasOne(models.ProntuarioDependente, {
      foreignKey: "agendamento_id",
    });
  };

  return AgendamentoDependente;
};
