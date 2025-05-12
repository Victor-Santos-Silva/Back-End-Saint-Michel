const ProntuarioDocente = require("../models/ProntuarioDocente");
const Usuario = require("../models/Usuario");

const prontuarioService = {
    create: async ({ problemaRelatado, recomendacaoMedico }) => {
        try {
            return await ProntuarioDocente.create({
                problemaRelatado,
                recomendacaoMedico
            });
        } catch (error) {
            console.error('Erro ao criar prontuario:', error);
            throw error;
        }
    },

    getAll: async () => {
        try {
            return await ProntuarioDocente.findAll({
                include: [
                    {
                        model: Usuario,
                        attributes: { exclude: ['senha'] }
                    },

                ],
            });
        } catch (error) {
            console.error('Erro ao buscar prontuarios:', error);
            throw new Error('Erro ao buscar os prontuarios.');
        }
    },

    getById: async (id) => {
        try {
            return await ProntuarioDocente.findByPk(id, {
                include: [
                    {
                        model: Usuario,
                        attributes: { exclude: ['senha'] }
                    },

                ],
            });
        } catch (error) {
            throw new Error('Erro ao buscar prontuario.');
        }
    },


    delete: async (id) => {
        try {
            const ProntuarioDeletado = await ProntuarioDocente.findByPk(id);
            if (!ProntuarioDeletado) {
                throw new Error("Prontuario não encontrado.");
            }

            await Prontuario.destroy({
                where: { id: id }
            });

            await ProntuarioDeletado.destroy();
            return { msg: "Prontuario removido com sucesso." }

        } catch (error) {
            throw error;
        }
    }
};

module.exports = prontuarioService;
