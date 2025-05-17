// models/NotificacaoPaciente.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const NotificacaoPaciente = sequelize.define("NotificacaoPaciente", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "O email não pode estar vazio." },
      isEmail: { msg: "Por favor, forneça um email válido." }
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "O título não pode estar vazio." },
    },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: "A mensagem não pode estar vazia." },
    },
  },
  lida: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true, // Adiciona createdAt e updatedAt
  tableName: "notificacoes_pacientes", // Nome explícito da tabela
});

module.exports = NotificacaoPaciente;