const prontuarioDocenteService = require("../services/prontuarioDocenteService");

const prontuarioDocenteController = {
    create: async (req, res) => {
        try {
            const { problemaRelatado, recomendacaoMedico } = req.body;

            const novoCadastro = await prontuarioDocenteService.create({
                problemaRelatado,
                recomendacaoMedico
            });

            res.status(201).json({ message: 'Prontuario criado com sucesso!', data: novoCadastro });
        } catch (error) {
            console.error('Erro no controller:', error.message);
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    getAll: async (req, res) => {
        try {
            const prontuario = await prontuarioDocenteService.getAll();
            return res.status(200).json({
                msg: 'Todos os prontuarios!',
                prontuario
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    },

    getOne: async (req, res) => {
        try {
            const prontuario = await prontuarioDocenteService.getById(req.params.id);
            if (!prontuario) {
                return res.status(404).json({
                    msg: 'Prontuario não encontrado!'
                });
            }
            return res.status(200).json({
                msg: 'Prontuario encontrado',
                prontuario
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletado = await prontuarioDocenteService.delete(id);
            res.status(200).json(deletado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = prontuarioDocenteController;
