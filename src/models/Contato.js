module.exports = (sequelize, DataTypes) => {
  const Contato = sequelize.define(
    "contatos",
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assunto: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      mensagem: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true, // Adiciona createdAt e updatedAt
    },
  );

  return Contato;
};
