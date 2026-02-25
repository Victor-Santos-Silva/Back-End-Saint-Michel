module.exports = (sequelize, DataTypes) => {
  const Paciente = sequelize.define(
    "Paciente",
    {
      nomeCompleto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      rg: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      genero: {
        type: DataTypes.ENUM("Masculino", "Feminino", "Outro"),
        allowNull: false,
      },
      endereco: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      convenio_medico: {
        type: DataTypes.STRING,
        allowNull: true, // Pode ser nulo
      },
      plano_convenio: {
        type: DataTypes.STRING,
        allowNull: true, // Pode ser nulo
      },
      tipo_sanguineo: {
        type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "pacientes",
      timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    },
  );

  Paciente.associate = (models) => {
    Paciente.hasMany(models.Agendamento, { foreignKey: "paciente_id" });
    Paciente.hasMany(models.AgendamentoDependente, {
      foreignKey: "paciente_id",
    });
    Paciente.hasMany(models.Dependente, { foreignKey: "paciente_id" });
    Paciente.hasMany(models.AgendamentoTitular, { foreignKey: "paciente_id" });
    Paciente.hasMany(models.Prontuario, { foreignKey: "paciente_id" });
    Paciente.hasMany(models.ProntuarioDependente, {
      foreignKey: "paciente_id",
    });
  };

  return Paciente;
};
