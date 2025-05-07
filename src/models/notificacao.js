// models/Notificacao.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Notificacao = sequelize.define("Notificacao", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "O ID do usuário deve ser um número inteiro." },
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
  tableName: "notificacoes", // Nome explícito da tabela
});

module.exports = Notificacao;
