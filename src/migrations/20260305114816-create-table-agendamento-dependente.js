"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AgendamentoDependente", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pacientes",
          key: "id",
        },
      },
      medico_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "medico",
          key: "id",
        },
      },
      dependente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "dependentes",
          key: "id",
        },
      },
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("pendente", "finalizado", "nao_compareceu"),
        allowNull: false,
        defaultValue: "pendente",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AgendamentoDependente");
  },
};
