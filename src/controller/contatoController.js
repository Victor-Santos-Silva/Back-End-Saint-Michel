const contatoService = require("../services/contatoService");

const contatoController = {
    criar: async (req, res) => {
        try {
            const { nome, email, assunto, mensagem } = req.body;
            const contato = await contatoService.criar({ nome, email, assunto, mensagem });
            res.status(201).json(contato);
        } catch (error) {
            console.error("Erro ao criar contato:", error);
            res.status(500).json({ error: "Erro interno no servidor." });
        }
    },

    listar: async (req, res) => {
        try {
            const contatos = await contatoService.listar();
            res.status(200).json(contatos);
        } catch (error) {
            console.error("Erro ao listar contatos:", error);
            res.status(500).json({ error: "Erro interno no servidor." });
        }
    },
    obterPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const contato = await contatoService.obterPorId(id);
            res.status(200).json(contato);
        } catch (error) {
            console.error("Erro ao listar contato por ID:", error);
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = contatoController;