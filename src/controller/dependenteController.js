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

        } catch (error) {

        }
    },

    update: async (req, res) => {
        try {

        } catch (error) {

        }
    },
    delet: async (req, res) => {
        try {

        } catch (error) {

        }
    }
};

module.exports = prontuarioController;
