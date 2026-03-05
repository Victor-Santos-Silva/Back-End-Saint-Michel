"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ServicosExtras", {
      servicoExtra: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data: {
        type: Sequelize.DATEONLY, // DATEONLY para armazenar apenas a data (sem hora)
        allowNull: false,
      },
      hora: {
        type: Sequelize.TIME, // TIME para armazenar apenas a hora
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ServicosExtras");
  },
};
