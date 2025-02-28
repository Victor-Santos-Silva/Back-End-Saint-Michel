const Medico = require("../models/medico");
const bcrypt = require("bcrypt");

const medicoService = {
    create: async (dadosMedico) => {
        try {
            // Criptografando a senha
            const hashedSenha = await bcrypt.hash(dadosMedico.senha_corporativa, 10);
            dadosMedico.senha_corporativa = hashedSenha;

            // Criando o médico
            const novoMedico = await Medico.create(dadosMedico);
            return novoMedico;
        } catch (error) {
            throw error;
        }
    },

    findById: async (id) => {
        try {
            const medico = await Medico.findByPk(id);
            if (!medico) {
                throw new Error("Médico não encontrado.");
            }
            return medico;
        } catch (error) {
            throw error;
        }
    },

    findAll: async () => {
        try {
            return await Medico.findAll();
        } catch (error) {
            throw error;
        }
    },

    update: async (id, dadosAtualizados) => {
        try {
            const medico = await Medico.findByPk(id);
            if (!medico) {
                throw new Error("Médico não encontrado.");
            }

            // Se houver senha nova, criptografa antes de atualizar
            if (dadosAtualizados.senha_corporativa) {
                dadosAtualizados.senha_corporativa = await bcrypt.hash(dadosAtualizados.senha_corporativa, 10);
            }

            await medico.update(dadosAtualizados);
            return medico;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const medico = await Medico.findByPk(id);
            if (!medico) {
                throw new Error("Médico não encontrado.");
            }

            await medico.destroy();
            return { msg: "Médico removido com sucesso." };
        } catch (error) {
            throw error;
        }
    }
};

module.exports = medicoService;
