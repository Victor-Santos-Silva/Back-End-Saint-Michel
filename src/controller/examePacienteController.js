const examePacienteService = require('../services/examePacienteService');

const examePacienteController = {
    create: async (req, res) => {
        try {
            const { tipoDeExame, exameEspecifico, data, hora } = req.body;
            const pedidoMedico = req.file?.filename;

            const novoExame = await examePacienteService.create({
                tipoDeExame,
                exameEspecifico,
                data,
                hora,
                pedidoMedico
            });

            res.status(201).json(novoExame);
        } catch (error) {
            console.error('Error creating examePaciente:', error);
            res.status(500).json({ message: 'Error creating examePaciente' });
        }
    },

    getAll: async (req, res) => {
        try {
            const examesPacientes = await examePacienteService.getAll();
            res.status(200).json(examesPacientes);
        } catch (error) {
            console.log('Error fetching examePacientes:', error);
            res.status(500).json({ message: 'Error fetching examePacientes' });
        }
    },

    getOne: async (req, res) => {
        try {
            const examePaciente = await examePacienteService.getOne(req.params.id);
            if (!examePaciente) {
                return res.status(404).json({ message: 'ExamePaciente not found' });
            }
            res.status(200).json(examePaciente);
        } catch (error) {
            console.log('Error fetching examePaciente:', error);
            res.status(500).json({ message: 'Error fetching examePaciente' });
        }
    },
}

module.exports = examePacienteController;