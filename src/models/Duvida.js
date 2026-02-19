module.exports = (sequelize, DataTypes) => {
  const Duvidas = sequelize.define(
    "Duvidas",
    {
      duvidas: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O campo 'duvidas' não pode estar vazio",
          },
        },
      },
    },
    {
      timestamps: true,
      tableName: "duvidas", // Nome da tabela no banco de dados
    },
  );

  return Duvidas;
};
