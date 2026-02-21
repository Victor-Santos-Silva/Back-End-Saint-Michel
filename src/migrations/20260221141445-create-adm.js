"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Administrador",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        nome: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },

        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },

        senha: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        timestamps: true,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Administrador");
  },
};
