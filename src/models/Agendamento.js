module.exports = (sequelize, DataTypes) => {
  const Agendamento = sequelize.define(
    "Agendamento",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      usuario_id: {
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
      tableName: "agendamentos",
      timestamps: false,
    },
  );

  Agendamento.associate = (models) => {
    Agendamento.belongsTo(models.Paciente, { foreignKey: "paciente_id" });
    Agendamento.belongsTo(models.Medico, { foreignKey: "medico_id" });
    Agendamento.hasOne(models.Prontuario, { foreignKey: "agendamento_id" });
  };

  return Agendamento;
};
