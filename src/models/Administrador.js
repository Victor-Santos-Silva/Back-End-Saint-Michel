const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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

    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    ultimoLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    indexes: [{ unique: true, fields: ["email"] }],
  },
);

module.exports = AdmModel;
