const medicoService = require("../services/medicoService");
const Medico = require("../models/medico");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

            const isValida = await bcrypt.compare(senha, medico.senha_corporativa);
            if (!isValida) {
                return res.status(400).json({
                    msg: "Senha incorreta",
                });
            }

            const token = jwt.sign(
                { id: medico.id, crm: medico.crm, nome: medico.nome_completo },
                process.env.SECRET,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                msg: "Login realizado com sucesso",
                token,
            });
        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ msg: "Erro interno no servidor, acione o suporte" });
        }
    },

    create: async (req, res) => {
        try {
            const { nome_completo, idade, cpf, crm, telefone, endereco, especialidade, nacionalidade, email_corporativo, senha_corporativa } = req.body;

            // Verifica se o multer salvou o arquivo corretamente
            const foto = req.file ? `/uploads/${req.file.filename}` : null;

            const novoCadastroMedico = await medicoService.create({
                nome_completo,
                idade,
                cpf,
                crm,
                telefone,
                endereco,
                especialidade,
                nacionalidade,
                email_corporativo,
                senha_corporativa,
                foto
            });

            res.status(201).json({
                mensagem: "Médico cadastrado com sucesso.",
                data: novoCadastroMedico
            });

        } catch (error) {
            console.error("Erro ao criar médico:", error);
            res.status(500).json({ error: "Erro interno no servidor." });
        }
    },

    findById: async (req, res) => {
        try {
            const { id } = req.params;
            const medico = await medicoService.findById(id);
            res.status(200).json(medico);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const medicos = await medicoService.findAll();
            res.status(200).json(medicos);
        } catch (error) {
            res.status(500).json({ error: "Erro interno no servidor." });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const dadosAtualizados = req.body;

            // Atualizar a imagem se for enviada
            if (req.file) {
                dadosAtualizados.foto = `/uploads/${req.file.filename}`;
            }

            const medicoAtualizado = await medicoService.update(id, dadosAtualizados);
            res.status(200).json(medicoAtualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const resultado = await medicoService.delete(id);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = medicoController;
