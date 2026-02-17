const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AdmModel = sequelize.define(
  "Adm",
  {
    nome: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue("email", value.toLowerCase().trim());
      },
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },

    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [60, 255],
      },
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
