const ExamePaciente = require('../models/ExamePaciente');

const examePacienteService = {
    create: async (novoExame) => {
        try {
            const { tipoDeExame, exameEspecifico, data, hora, pedidoMedico } = novoExame;
            return await ExamePaciente.create({
                tipoDeExame,
                exameEspecifico,
                data,
                hora,
                pedidoMedico
            });
        } catch (error) {
            console.error('Erro ao criar exame:', error);
            throw error;
        }
    },

    getAll: async () => {
        try {
            return await ExamePaciente.findAll();
        } catch (error) {
            console.error('Erro ao buscar exames:', error);
            throw error;
        }
    },

    getOne: async (id) => {
        try {
            return await ExamePaciente.findByPk(id);
        } catch (error) {
            console.error('Erro ao buscar exame:', error);
            throw error;
        }
    },
}

module.exports = examePacienteService;