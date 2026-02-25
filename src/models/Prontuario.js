module.exports = (sequelize, DataTypes) => {
  const Prontuario = sequelize.define(
    "Prontuario",
    {
      agendamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "agendamentos",
          key: "id",
        },
      },
      paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: "Prontuarios",
    },
  );

  Prontuario.associate = (models) => {
    Prontuario.belongsTo(models.Paciente, { foreignKey: "paciente_id" });
    Prontuario.belongsTo(models.Agendamento, { foreignKey: "agendamento_id" });
  };

  return Prontuario;
};
