module.exports = (sequelize, DataTypes) => {
  const AdmModel = sequelize.define(
    "Administrador",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
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
      tableName: "Administrador",
      timestamps: true,
    },
  );

  return AdmModel;
};
