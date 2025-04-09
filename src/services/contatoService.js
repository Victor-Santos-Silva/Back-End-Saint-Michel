const Contato = require('../models/Contato');

const contatoService = {
    criar: async (criarContato) => {
        try {
            const contato = await Contato.create(criarContato);
            return contato;
        } catch (error) {
            throw error;
        }
    },

    listar: async () => {
        try {
            const contatos = await Contato.findAll();
            return contatos;
        } catch (error) {
            throw error;
        }
    },

    obterPorId: async (id) => {
        try {
            const contato = await Contato.findByPk(id);
            if (!contato) {
                throw new Error('Contato não encontrado.');
            }
            return contato;
        } catch (error) {
            throw error;
        }
    },
}

module.exports = contatoService;