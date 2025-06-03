const usuarioService = require("../services/usuarioService");
const Usuario = require("../models/Usuario");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Configuração do Nodemailer
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'saintmichelhospital@gmail.com',
        pass: 'skixwmgfyglzfpwu' // Substitua por variável de ambiente em produção
    }
});
''
// Armazenamento temporário de códigos
const verificationCodes = {};

// Gera um código de 6 dígitos
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Envia o código de verificação para o e-mail
async function sendVerificationCode(email) {
    const code = generateVerificationCode();

    verificationCodes[email] = {
        code,
        createdAt: Date.now()
    };

    await transport.sendMail({
        from: 'Hospital Saint Michel <saintmichelhospital@gmail.com>',
        to: email,
        subject: 'Código de Verificação',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; text-align: center;">
                <h2>Seu código de verificação</h2>
                <div style="font-size: 32px; font-weight: bold; color: #2563eb; margin: 20px 0;">${code}</div>
                <p style="color: #555;">Este código expira em 15 minutos.</p>
            </div>
        `,
        text: `Seu código de verificação é: ${code}\nExpira em 15 minutos.`
    });
}

// Verifica se o código está correto e dentro do tempo
function verifyCode(email, code) {
    const data = verificationCodes[email];
    if (!data) return { valid: false, reason: "Código não encontrado" };

    const expired = (Date.now() - data.createdAt) > 15 * 60 * 1000;
    if (expired) {
        delete verificationCodes[email];
        return { valid: false, reason: "Código expirado" };
    }

    if (data.code !== code) {
        return { valid: false, reason: "Código inválido" };
    }

    delete verificationCodes[email];
    return { valid: true };
}

const usuarioController = {
    login: async (req, res) => {
        try {
            const { email, senha } = req.body;
            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario) {
                return res.status(400).json({ msg: "Email ou senha incorretos" });
            }

            const isValida = await bcrypt.compare(senha, usuario.senha);
            if (!isValida) {
                return res.status(400).json({ msg: "Email ou senha incorretos" });
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

    enviarCodigo: async (req, res) => {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ msg: "Email é obrigatório" });
        }

        try {
            await sendVerificationCode(email);
            return res.status(200).json({ msg: "Código de verificação enviado com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Erro ao enviar o código de verificação" });
        }
    },

    esqueciSenha: async (req, res) => {
        const { email, senhaNova, codigo } = req.body;

        if (!email || !senhaNova || !codigo) {
            return res.status(400).json({ msg: "Email, nova senha e código são obrigatórios" });
        }

        const resultado = verifyCode(email, codigo);
        if (!resultado.valid) {
            return res.status(400).json({ msg: resultado.reason });
        }

        try {
            const usuario = await usuarioService.esqueciSenha(email, senhaNova);
            if (!usuario) {
                return res.status(400).json({ msg: "Usuário não encontrado" });
            }

            return res.status(200).json({
                msg: "Senha atualizada com sucesso",
                usuario
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message || "Erro ao atualizar a senha" });
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
            return res.status(200).json({ msg: 'Todos os Usuários!', usuario });
        } catch (error) {
            return res.status(500).json({ msg: 'Ocorreu um erro no servidor' });
        }
    },

    getOne: async (req, res) => {
        try {
            const usuario = await usuarioService.getById(req.params.id);
            if (!usuario) {
                return res.status(404).json({ msg: 'Usuário não encontrado!' });
            }
            return res.status(200).json({ msg: 'Usuário encontrado', usuario });
        } catch (error) {
            return res.status(500).json({ msg: 'Ocorreu um erro no servidor' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const atualizacao = req.body;
            const atualizado = await usuarioService.update(id, atualizacao);
            res.status(200).json(atualizado);
        } catch (error) {
            return res.status(500).json({ msg: 'Ocorreu um erro no servidor' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletado = await usuarioService.delete(id);
            res.status(200).json(deletado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = usuarioController;
