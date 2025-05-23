const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./Usuario");

const Dependente = sequelize.define("Dependentes", {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    nomeCompleto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parentesco: {
        type: DataTypes.ENUM('Pai', 'Mãe', 'Irmão', 'Irmã', 'Cônjuge', 'Filho', 'Filha', 'Outro'),
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
        type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
        allowNull: true
    },
    genero: {
        type: DataTypes.ENUM('Masculino', 'Feminino', 'Outro'),
        allowNull: false,
    },
    imagemGenero: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true,
});


module.exports = Dependente;
