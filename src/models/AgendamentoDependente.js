module.exports = (sequelize, DataTypes) => {
  const AgendamentoDependente = sequelize.define(
    "AgendamentoDependente",
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      medico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "medicos",
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
    AgendamentoDependente.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
    });
    AgendamentoDependente.hasOne(models.ProntuarioDependente, {
      foreignKey: "agendamento_id",
    });
  };

  return AgendamentoDependente;
};
