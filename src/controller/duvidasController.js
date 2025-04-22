const duvidasService = require('../services/duvidaService');

const duvidasController = {
    // Criar nova dúvida
    criar: async (req, res) => {
        try {
            const novaDuvida = await duvidasService.create(req.body);
            res.status(201).json({
                message: 'Dúvida criada com sucesso!',
                data: novaDuvida
            });
        } catch (error) {
            res.status(400).json({
                error: error.message || 'Erro ao criar dúvida'
            });
        }
    },

    // Listar todas as dúvidas
    listarTodos: async (req, res) => {
        try {
            const duvidas = await duvidasService.getAll();
            res.status(200).json({
                count: duvidas.length,
                data: duvidas
            });
        } catch (error) {
            res.status(500).json({
                error: error.message || 'Erro ao listar dúvidas'
            });
        }
    },

    // Buscar dúvida por ID
    buscarPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const duvida = await duvidasService.getById(id);
            
            if (!duvida) {
                return res.status(404).json({
                    message: 'Dúvida não encontrada'
                });
            }
            
            res.status(200).json(duvida);
        } catch (error) {
            res.status(500).json({
                error: error.message || 'Erro ao buscar dúvida'
            });
        }
    },

    // Atualizar dúvida
    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const duvidaAtualizada = await duvidasService.update(id, req.body);
            
            res.status(200).json({
                message: 'Dúvida atualizada com sucesso!',
                data: duvidaAtualizada
            });
        } catch (error) {
            res.status(400).json({
                error: error.message || 'Erro ao atualizar dúvida'
            });
        }
    },

    // Deletar dúvida
    deletar: async (req, res) => {
        try {
            const { id } = req.params;
            await duvidasService.delete(id);
            
            res.status(200).json({
                message: 'Dúvida removida com sucesso!',
            });
        } catch (error) {
            res.status(500).json({
                error: error.message || 'Erro ao deletar dúvida'
            });
        }
    },

    // Buscar dúvidas por termo (opcional)
    buscarPorTermo: async (req, res) => {
        try {
            const { termo } = req.query;
            const duvidas = await duvidasService.search(termo);
            
            res.status(200).json({
                count: duvidas.length,
                data: duvidas
            });
        } catch (error) {
            res.status(500).json({
                error: error.message || 'Erro ao buscar dúvidas'
            });
        }
    }
};

module.exports = duvidasController;