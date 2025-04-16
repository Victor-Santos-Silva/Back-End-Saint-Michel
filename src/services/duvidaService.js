const Duvidas = require("../models/duvidas");

const duvidasService = {
    create: async (duvidaData) => {
        try {
            const { duvidas } = duvidaData;

            if (!duvidas || typeof duvidas !== 'string') {
                throw new Error("O texto da dúvida é obrigatório e deve ser uma string");
            }

            return await Duvidas.create({
                duvidas
            });
        } catch (error) {
            console.error('Erro ao criar Dúvida:', error);
            throw error;
        }
    },

    getAll: async () => {
        try {
            return await Duvidas.findAll({
                order: [['createdAt', 'DESC']]
            });
        } catch (error) {
            throw new Error('Erro ao buscar todas as dúvidas');
        }
    },

    getById: async (id) => {
        try {
            const duvida = await Duvidas.findByPk(id);
            if (!duvida) {
                return null;
            }
            return duvida;
        } catch (error) {
            throw new Error('Erro ao buscar dúvida por ID');
        }
    },

    update: async (id, duvidaData) => {
        try {
            const duvida = await Duvidas.findByPk(id);
            if (!duvida) {
                throw new Error("Dúvida não encontrada");
            }

            const { duvidas } = duvidaData;
            if (!duvidas || typeof duvidas !== 'string') {
                throw new Error("O texto da dúvida é obrigatório e deve ser uma string");
            }

            await duvida.update({ duvidas });
            return duvida;
        } catch (error) {
            throw new Error('Erro ao atualizar dúvida');
        }
    },

    delete: async (id) => {
        try {
            const duvida = await Duvidas.findByPk(id);
            if (!duvida) {
                return null;
            }
            await duvida.destroy();
            return duvida;
        } catch (error) {
            throw new Error('Erro ao deletar dúvida');
        }
    },

    // Método adicional para buscar dúvidas por termo (opcional)
    search: async (termo) => {
        try {
            return await Duvidas.findAll({
                where: {
                    duvidas: {
                        [Op.like]: `%${termo}%`
                    }
                },
                order: [['createdAt', 'DESC']]
            });
        } catch (error) {
            throw new Error('Erro ao buscar dúvidas por termo');
        }
    }
};

module.exports = duvidasService;