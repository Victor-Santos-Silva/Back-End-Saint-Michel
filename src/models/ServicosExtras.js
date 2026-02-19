// models/ServicosExtras.js
module.exports = (sequelize, DataTypes) => {
  const ServicosExtras = sequelize.define(
    "ServicosExtras",
    {
      servicoExtra: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endereco: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      data: {
        type: DataTypes.DATEONLY, // DATEONLY para armazenar apenas a data (sem hora)
        allowNull: false,
      },
      hora: {
        type: DataTypes.TIME, // TIME para armazenar apenas a hora
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "servicos_extras",
    },
  );

  return ServicosExtras;
};
