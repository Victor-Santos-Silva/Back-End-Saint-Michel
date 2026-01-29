const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Medico = sequelize.define(
  "Medico",
  {
    nomeCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataNascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    crm: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    especialidade: {
      type: DataTypes.ENUM(
        "Ortopedista",
        "Proctologista",
        "Oncologista",
        "Otorrinolaringologista",
        "Oftalmologista",
        "Cardiologista",
        "Pneumologista",
        "Nefrologista",
        "Gastroenterologista",
        "Urologista",
        "Dermatologista",
        "Ginecologista",
      ),
      allowNull: false,
    },
    emailCorporativo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senhaCorporativa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    tableName: "medicos", // Nome explícito da tabela
  },
);

module.exports = Medico;
