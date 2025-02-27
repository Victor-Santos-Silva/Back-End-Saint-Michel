const Medico = require("../models/medico");
const bcrypt = require("bcrypt");

const medicoService = {
    create: async (cadastro) => {
        try {
            const { nome, crm, senha } = cadastro;
            
            const hasSenha = await bcrypt.hash(senha, 10);

            return await Medico.create({
                nome, crm, senha:hasSenha
            });
        } catch (error) {
            console.error('Erro ao criar o Medico', error);
            throw error;
        }
    }
}

module.exports = medicoService