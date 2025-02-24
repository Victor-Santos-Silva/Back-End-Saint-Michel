const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const EMAIL_FIXO = "admin@email.com";
const SENHA_FIXA = "123456";

const AdmModel = sequelize.define("Adm", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            defaultValue: EMAIL_FIXO, // Email fixo
            validate: {
                isEmail: true,
            },
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: bcrypt.hashSync(SENHA_FIXA, 10), // Senha fixa já criptografada
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: true, // Sempre verdadeiro
        },
    },
    {
        timestamps: true,
        hooks: {
            beforeUpdate: async () => {
                throw new Error("Não é permitido alterar o admin!");
            },
        },
    }
);

// ✅ Garantir que o admin seja criado automaticamente no banco
(async () => {
    await sequelize.sync();

    const adminExistente = await AdmModel.findOne({ where: { email: EMAIL_FIXO } });

    if (!adminExistente) {
        await AdmModel.create({
            email: EMAIL_FIXO,
            senha: SENHA_FIXA, // Senha fixa criptografada
            isAdmin: true,
        });
        console.log("✅ Admin criado automaticamente no banco.");
    } else {
        console.log("✅ Admin já existe.");
    }
})();

module.exports = AdmModel;
