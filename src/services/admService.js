const Adm = require("../models/adm");
const bcrypt = require("bcrypt");

const admService = {
    create: async (cadastro) => {
        try {
            const { nome, email, senha } = cadastro;

            const hashSenha = await bcrypt.hash(senha, 10);

            return await Adm.create({
                nome, email, senha: hashSenha
            });
        } catch (error) {
            console.error('Erro ao criar Adm:', error);
            throw error;
        }
    }
};

module.exports = admService;
