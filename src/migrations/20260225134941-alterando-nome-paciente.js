"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Pacientes", "nome", "nomeCompleto");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Pacientes", "nomeCompleto", "nome");
  },
};
