module.exports = (sequelize, DataTypes) => {
  const Dependente = sequelize.define(
    "Dependente",
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Usuario",
          key: "id",
        },
      },
      nomeCompleto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentesco: {
        type: DataTypes.ENUM(
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
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [11, 11],
        },
      },
      tipoSanguineo: {
        type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
        allowNull: true,
      },
      genero: {
        type: DataTypes.ENUM("Masculino", "Feminino", "Outro"),
        allowNull: false,
      },
      imagemGenero: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    },
  );

  Dependente.associate = (models) => {
    Dependente.belongsTo(models.Usuario, { foreignKey: "usuario_id" });
  };
  return Dependente;
};
