const Dependente = require("../models/DependenteAdicionado");
const Usuario = require("../models/Usuario");

const usuarioService = {
    create: async (cadastro) => {
        try {
            const { usuario_id, nomeCompleto, dataNascimento, rg, cpf, genero, tipoSanguineo, imagemGenero } = cadastro;

            if (!rg || !cpf) {
                throw new Error("CPF ou RG inválidos.");
            }

            return await Dependente.create({
                usuario_id, nomeCompleto, dataNascimento, rg, cpf, genero,
                tipoSanguineo, imagemGenero
            });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    },
    getAll: async () => {
        try {
            return await Dependente.findAll({
                model: Usuario
            });
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            throw new Error('Erro ao buscar usuários.');
        }
    },
    getById: async (id) => {
        try {
            return await Dependente.findByPk(id);
        } catch (error) {
            throw new Error('Erro ao buscar usuário.');
        }
    },
    update: async (id, atualizacao) => {
        try {
            const usuario = await Dependente.findByPk(id);
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
            const usuarioDeletado = await Dependente.findByPk(id);
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
