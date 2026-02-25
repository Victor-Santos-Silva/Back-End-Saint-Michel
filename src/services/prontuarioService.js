const Prontuario = require("../models/Prontuario");
const Usuario = require("../models/Pacientes");
const prontuarioService = {
    create: async ({ usuario_id, problemaRelatado, recomendacaoMedico }) => {
        try {
            return await Prontuario.create({
                usuario_id,
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
            return await Prontuario.findAll({
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
            return await Prontuario.findByPk(id, {
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
            const ProntuarioDeletado = await Prontuario.findByPk(id);
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
