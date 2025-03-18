const usuarioService = require("../services/usuarioService");
const Usuario = require("../models/Usuario");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const usuarioController = {
    login: async (req, res) => {
        try {
            const { email, senha } = req.body;

            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario) {
                return res.status(400).json({
                    msg: "Email ou senha incorretos",
                });
            }

            const isValida = await bcrypt.compare(senha, usuario.senha);
            if (!isValida) {
                return res.status(400).json({
                    msg: "Email ou senha incorretos",
                });
            }

            const token = jwt.sign(
                { id: usuario.id, email: usuario.email, nome: usuario.nomeCompleto },
                process.env.SECRET,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                msg: "Login realizado",
                token,
                usuario: usuario.nomeCompleto,
                id: usuario.id
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o suporte" });
        }
    },

    create: async (req, res) => {
        try {
            const novoCadastro = await usuarioService.create(req.body);
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
            const usuario = await usuarioService.getAll();
            return res.status(200).json({
                msg: 'Todos os Usuários!',
                usuario
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    },

    getOne: async (req, res) => {
        try {
            const usuario = await usuarioService.getById(req.params.id);
            if (!usuario) {
                return res.status(404).json({
                    msg: 'Usuário não encontrado!'
                });
            }
            return res.status(200).json({
                msg: 'Usuário encontrado',
                usuario
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    }
};

module.exports = usuarioController;
