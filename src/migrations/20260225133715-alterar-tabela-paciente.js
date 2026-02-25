"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("pacientes", "data_nascimento", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn("pacientes", "cpf", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.addColumn("pacientes", "rg", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.addColumn("pacientes", "genero", {
      type: Sequelize.ENUM("Masculino", "Feminino", "Outro"),
      allowNull: false,
    });

    await queryInterface.addColumn("pacientes", "endereco", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("pacientes", "convenio_medico", {
      type: Sequelize.STRING,
      allowNull: true, // Permite que seja nulo
    });

    await queryInterface.addColumn("pacientes", "plano_convenio", {
      type: Sequelize.STRING,
      allowNull: true, // Permite que seja nulo
    });

    await queryInterface.addColumn("pacientes", "tipo_sanguineo", {
      type: Sequelize.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
      allowNull: true, // Permite que seja nulo
    });

    await queryInterface.addColumn("pacientes", "senha", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("pacientes", "data_nascimento");
    await queryInterface.removeColumn("pacientes", "cpf");
    await queryInterface.removeColumn("pacientes", "rg");
    await queryInterface.removeColumn("pacientes", "genero");
    await queryInterface.removeColumn("pacientes", "endereco");
    await queryInterface.removeColumn("pacientes", "convenio_medico");
    await queryInterface.removeColumn("pacientes", "plano_convenio");
    await queryInterface.removeColumn("pacientes", "tipo_sanguineo");
    await queryInterface.removeColumn("pacientes", "senha");
  },
};
