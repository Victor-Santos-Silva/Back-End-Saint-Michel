"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "dependentes",
      {
        paciente_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Pacientes",
            key: "id",
          },
        },
        nomeCompleto: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        parentesco: {
          type: Sequelize.ENUM(
            "Pai",
            "Mãe",
            "Irmão",
            "Irmã",
            "Cônjuge",
            "Filho",
            "Filha",
            "Outro",
          ),
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
          validate: {
            len: [11, 11],
          },
        },
        tipoSanguineo: {
          type: Sequelize.ENUM(
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-",
          ),
          allowNull: true,
        },
        genero: {
          type: Sequelize.ENUM("Masculino", "Feminino", "Outro"),
          allowNull: false,
        },
        imagemGenero: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        timestamps: true,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("dependente");
  },
};
