"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProntuarioDependente", {
      agendamento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "AgendamentoDependente",
          key: "id",
        },
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Pacientes",
          key: "id",
        },
      },
      problemaRelatado: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      recomendacaoMedico: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProntuarioDependente");
  },
};
