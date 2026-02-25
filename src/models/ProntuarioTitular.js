module.exports = (sequelize, DataTypes) => {
  const ProntuarioTitular = sequelize.define(
    "ProntuarioTitular",
    {
      agendamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "agendamentoTitulars",
          key: "id",
        },
      },
      paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "pacientes",
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
      tableName: "ProntuarioTitulars",
    },
  );

  ProntuarioTitular.associate = (models) => {
    ProntuarioTitular.belongsTo(models.AgendamentoTitular, {
      foreignKey: "agendamento_id",
    });
  };

  return ProntuarioTitular;
};
