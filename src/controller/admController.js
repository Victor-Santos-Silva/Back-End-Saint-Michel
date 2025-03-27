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

    esqueciSenha: async (req, res) => {
        const { email, novaSenha } = req.body;

        // Validação básica dos campos
        if (!email || !novaSenha) {
            return res.status(400).json({
                msg: "Email e nova senha são obrigatórios",
            });
        }

        try {
            const admin = await admService.esqueciSenha(email, novaSenha);
            if (!admin) {
                return res.status(400).json({
                    msg: "Admin não encontrado ou email incorreto",
                });
            }
            return res.status(200).json({
                msg: "Senha do admin foi atualizada com sucesso",
                admin: admin,
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message || "Erro ao atualizar o Admin",
            });
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
    },

    update: async (req, res) => {
        try {
            const admin = await admService.update(req.params.id, req.body);
            if (!admin) {
                return res.status(400).json({
                    msg: 'Admin nao encontrado'
                });
            }
            return res.status(200).json({
                msg: 'Admin atualizado com sucesso',
                admin
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao atualizar o admin'
            })
        }
    },

    getAll: async (req, res) => {
        try {
            const admins = await admService.getAll();
            return res.status(200).json({
                msg: 'Todos os admins!',
                admins
            });
        } catch (error) {
            return res.status(200).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    },

    getOne: async (req, res) => {
        try {
            const admin = await admService.getById(req.params.id);
            if (!admin) {
                return res.status(400).json({
                    msg: 'Admin nao encontrado!'
                });
            }
            return res.status(200).json({
                msg: 'Admin encontrado',
                admin
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    },

    delete: async (req, res) => {
        try {
            const admin = await admService.delete(req.params.id);
            if (!admin) {
                return res.status(400).json({
                    msg: 'Admin nao encontrado'
                })
            }
            return res.status(200).json({
                msg: 'Admin deletado com sucesso!'
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    }
};

module.exports = admController;
