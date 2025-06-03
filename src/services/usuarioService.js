const Agendamento = require("../models/Agendamento");
const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');

const usuarioService = {
    create: async (cadastro) => {
        try {
            const { nomeCompleto, dataDeNascimento, cpf, rg, genero, endereco, telefone, convenioMedico, planoConvenio, tipoSanguineo, email, senha, imagemGenero } = cadastro;

            // Hash apenas na senha principal
            const hashSenha = await bcrypt.hash(senha, 10);

            // Salva os dois campos no banco
            return await Usuario.create({
                nomeCompleto, dataDeNascimento, cpf, rg, genero,
                endereco, telefone, convenioMedico, planoConvenio, tipoSanguineo,
                email, senha: hashSenha, imagemGenero
            });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    },
    esqueciSenha: async (email, senhaNova) => {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            throw new Error("Usuario não encontrado");
        }

        const hashSenha = await bcrypt.hash(senhaNova, 10);
        await usuario.update({ senha: hashSenha });
        return usuario;

    },
    getById: async (id) => {
        try {
            return await Usuario.findByPk(id);
        } catch (error) {
            throw new Error('Erro ao buscar usuário.');
        }
    },
    getAll: async () => {
        try {
            return await Usuario.findAll();
        } catch (error) {
            throw new Error('Erro ao buscar usuários.');
        }
    },
    update: async (id, atualizacao) => {
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                throw new Error("Usuario não encontrado.");
            }

            if (atualizacao.senha) {
                const hashSenha = await bcrypt.hash(atualizacao.senha, 10);
                atualizacao.senha = hashSenha;
            }

            await usuario.update(atualizacao);
            return usuario;
        } catch (error) {
            throw new Error("Erro ao atualizar:" + error);

        }
    },
    delete: async (id) => {
        try {
            const usuarioDeletado = await Usuario.findByPk(id);
            if (!usuarioDeletado) {
                throw new Error("Usuario não encontrado.");
            }

            await Agendamento.destroy({
                where: { usuario_id: id }
            });

            await usuarioDeletado.destroy();
            return { msg: "Usuario removido com sucesso." }

        } catch (error) {
            throw error;
        }
    }
};

module.exports = usuarioService;
