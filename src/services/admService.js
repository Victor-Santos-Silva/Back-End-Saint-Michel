const Adm = require("../models/adm");
const bcrypt = require("bcrypt");

const admService = {
    create: async (cadastro) => {
        try {
            const { nome, email, senha } = cadastro;

            return await Adm.create({
                nome, email, senha
            });
        } catch (error) {
            console.error('Erro ao criar Adm:', error);
            throw error;
        }
    }
};

module.exports = admService;
