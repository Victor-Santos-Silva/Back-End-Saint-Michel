const dependenteService = require("../services/dependenteService.js");

const prontuarioController = {
    create: async (req, res) => {
        try {
            const adicionarDependente = await dependenteService.create(req.body, req.usuario_id);
            res.status(201).json({
                message: 'Dependente cadastrado com sucesso!',
                adicionarDependente
            });
        } catch (error) {
            console.error('Erro no controller:', error);
            let errorMessage = 'Erro interno no servidor';
            if (error.name === 'SequelizeValidationError') {
                errorMessage = 'Dados de cadastro inválidos';
            } else if (error.name === 'SequelizeForeignKeyConstraintError') {
                errorMessage = 'Usuário relacionado não encontrado';
            }
            res.status(500).json({
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    getAll: async (req, res) => {
        try {
            const dependentes = await dependenteService.getAll();
            res.status(200).json(dependentes);
        } catch (error) {
            console.error('Erro no controller:', error);
            let errorMessage = 'Erro interno no servidor';
            if (error.name === 'SequelizeDatabaseError') {
                errorMessage = 'Erro ao acessar o banco de dados';
            }
            res.status(500).json({
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const dependente = await dependenteService.getById(id);
            if (dependente) {
                res.status(200).json(dependente);
            } else {
                res.status(404).json({
                    message: 'Dependente não encontrado'
                });
            }
        } catch (error) {
            console.error('Erro no controller:', error);
            let errorMessage = 'Erro interno no servidor';
            if (error.name === 'SequelizeDatabaseError') {
                errorMessage = 'Erro ao acessar o banco de dados';
            }
            res.status(500).json({
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const dependenteAtualizado = await dependenteService.update(id, req.body);
            if (dependenteAtualizado) {
                res.status(200).json({
                    message: 'Dependente atualizado com sucesso!',
                    dependenteAtualizado
                });
            } else {
                res.status(404).json({
                    message: 'Dependente não encontrado'
                });
            }
        } catch (error) {
            console.error('Erro no controller:', error);
            let errorMessage = 'Erro interno no servidor';
            if (error.name === 'SequelizeDatabaseError') {
                errorMessage = 'Erro ao acessar o banco de dados';
            }
            res.status(500).json({
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },
    delet: async (req, res) => {
        try {
            const { id } = req.params;
            const dependenteDeletado = await dependenteService.delete(id);
            if (dependenteDeletado) {
                res.status(200).json({
                    message: 'Dependente deletado com sucesso!',
                    dependenteDeletado
                });
            } else {
                res.status(404).json({
                    message: 'Dependente não encontrado'
                });
            }
        } catch (error) {
            console.error('Erro no controller:', error);
            let errorMessage = 'Erro interno no servidor';
            if (error.name === 'SequelizeDatabaseError') {
                errorMessage = 'Erro ao acessar o banco de dados';
            }
            res.status(500).json({
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },
    buscarPorUsuarioId: async (req, res) => {
        try {
            const { usuario_id } = req.params;
            const dependentes = await dependenteService.buscarPorUsuarioId(usuario_id);
            if (dependentes) {
                res.status(200).json(dependentes);
            } else {
                res.status(404).json({
                    message: 'Dependente não encontrado'
                });
            }
        } catch (error) {
            console.error('Erro no controller:', error);
            let errorMessage = 'Erro interno no servidor';
            if (error.name === 'SequelizeDatabaseError') {
                errorMessage = 'Erro ao acessar o banco de dados';
            }
            res.status(500).json({
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

};

module.exports = prontuarioController;
