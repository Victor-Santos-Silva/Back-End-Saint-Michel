module.exports = (sequelize, DataTypes) => {
  const ExamePaciente = sequelize.define(
    "examePaciente",
    {
      tipoDeExame: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      exameEspecifico: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hora: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      pedidoMedico: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );

  return ExamePaciente;
};
