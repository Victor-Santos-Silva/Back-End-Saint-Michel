"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("medico", {
      nomeCompleto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dataNascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      crm: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      especialidade: {
        type: Sequelize.ENUM(
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
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      senhaCorporativa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("medico");
  },
};
