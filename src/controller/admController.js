const admService = require("../services/admService");
const Admin = require("../models/adm");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const admController = {
    login: async (req, res) => {
        try {
            const { email, senha } = req.body;

            const admin = await Admin.findOne({ where: { email } });

            if (!admin) {
                return res.status(400).json({
                    msg: "Email incorreto",
                });
            }

            const isValida = await bcrypt.compare(senha, admin.senha);
            if (!isValida) {
                return res.status(400).json({
                    msg: "Senha incorreta",
                });
            }

            const token = jwt.sign(
                { email: admin.email, nome: admin.nome },
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
            const novoCadastroAdm = await admService.create(req.body);
            res.status(201).json({
                mensagem: 'Admin criado com sucesso.',
                data: novoCadastroAdm
            })

        } catch (error) {
            console.error('Erro no controller:', error.mensagem);

            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ error: 'Erro de validação: ' + error.errors.map(err => err.message).join(', ') });
            }
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
};

module.exports = admController;
