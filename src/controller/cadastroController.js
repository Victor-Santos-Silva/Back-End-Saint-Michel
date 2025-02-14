const cadastroService = require("../services/cadastroService");

const cadastroController = {
    create: async (req, res) => {
        try {
            const { senha, repetir_senha } = req.body;
            if (senha !== repetir_senha) {
                return res.status(400).json({ error: 'As senhas não coincidem.' });
            }
            const novoCadastro = await cadastroService.create(req.body);
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!', data: novoCadastro });
        } catch (error) {
            console.error('Erro no controller:', error.message);

            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ error: 'Erro de validação: ' + error.errors.map(err => err.message).join(', ') });
            }
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },
    getAll: async (req, res) => {
        try {
            const cadastro = await cadastroService.getAll();
            return res.status(200).json({
                msg: 'Todos os Usuários!',
                cadastro
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    },
    getOne: async (req, res) => {
        try {
            const cadastro = await cadastroService.getById(req.params.id);
            if (!cadastro) {
                return res.status(404).json({
                    msg: 'Usuário não encontrado!'
                });
            }
            return res.status(200).json({
                msg: 'Usuário encontrado',
                cadastro
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    }
};

module.exports = cadastroController;
