const medicoService = require("../services/medicoService");
const Medico = require("../models/medico");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const medicoController = {
    login: async (req, res) => {
        try {
            const { crm, senha } = req.body;

            const medico = await Medico.findOne({ where: { crm } });

            if (!medico) {
                return res.status(400).json({
                    msg: "CRM incorreto",
                });
            }

            const isValida = await bcrypt.compare(senha, medico.senha);
            if (!isValida) {
                return res.status(400).json({
                    msg: "Senha incorreta",
                });
            }

            const token = jwt.sign(
                { crm: medico.crm, nome: medico.nome },
                process.env.SECRET,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                msg: "Login realizado",
                token,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o suporte" });
        }
    },

    create: async (req, res) => {
        try {
            const novoCadastroMedico = await medicoService.create(req.body);
            res.status(201).json({
                mensagem: 'Médico criado com sucesso.',
                data: novoCadastroMedico
            });

        } catch (error) {
            console.error('Erro no controller:', error.mensagem);

            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ error: 'Erro de validação: ' + error.errors.map(err => err.message).join(', ') });
            }
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
};

module.exports = medicoController;
