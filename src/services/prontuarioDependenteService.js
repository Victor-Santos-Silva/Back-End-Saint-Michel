const prontuarioDependente = require("../models/ProntuarioDependente");
const Usuario = require("../models/Usuario");

const ProntuarioDependenteService = {
    create: async ({ problemaRelatado, recomendacaoMedico, agendamento_id, usuario_id }) => {
        try {
            return await prontuarioDependente.create({
                problemaRelatado,
                recomendacaoMedico,
                agendamento_id,
                usuario_id
            });
        } catch (error) {
            console.error('Erro ao criar prontuario:', error);
            throw error;
        }
    },

    getAll: async () => {
        try {
            return await prontuarioDependente.findAll({
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
            return await prontuarioDependente.findByPk(id, {
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
            const ProntuarioDeletado = await prontuarioDependente.findByPk(id);
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

module.exports = ProntuarioDependenteService;
