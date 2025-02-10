const usuariosService = require("../services/usuariosService")

const usuariosController = {
    create: async (req, res) => {
        try {
            const novoUsuario = await usuariosService.create(req.body);
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!', data: novoUsuario });
        } catch (error) {
            console.error('Erro no controller:', error.message);

            // Verificar se o erro é do Sequelize
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ error: 'Erro de validação: ' + error.errors.map(err => err.message).join(', ') });
            }

            // Outros erros
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },
    getAll: async (req, res) => {
        try {
            const usuarios = await usuariosService.getAll();
            return res.status(200).json({
                msg: 'Todos os Usuario!',
                usuarios
            });
        } catch (error) {
            return res.status(200).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    },
    getOne: async (req, res) => {
        try {
            const cliente = await usuariosService.getById(req.params.id);
            if (!cliente) {
                return res.status(400).json({
                    msg: 'Usuario nao encontrado!'
                });
            }
            return res.status(200).json({
                msg: 'Usuario encontrado',
                cliente
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    }
}

module.exports = usuariosController;