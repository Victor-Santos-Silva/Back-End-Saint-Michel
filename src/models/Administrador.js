module.exports = (sequelize, DataTypes) => {
  const AdmModel = sequelize.define(
    "Adm",
    {
      nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },

      senha: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );

  return AdmModel;
};
