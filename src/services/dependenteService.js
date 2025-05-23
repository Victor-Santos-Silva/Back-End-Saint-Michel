const Dependente = require("../models/DependenteAdicionado");
const Usuario = require("../models/Usuario");

const usuarioService = {
    create: async (cadastro) => {
        try {
            const { usuario_id, nomeCompleto, parentesco, dataNascimento, cpf, genero, tipoSanguineo, imagemGenero } = cadastro;

            if (!cpf) {
                throw new Error("CPF inválidos / usado.");
            }

            return await Dependente.create({
                usuario_id, nomeCompleto, parentesco, dataNascimento, cpf, genero,
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
            const dependente = await Dependente.findByPk(id);
            if (!dependente) {
                throw new Error("Dependente não encontrado.");
            }
            await dependente.update(atualizacao);
            return dependente;
        } catch (error) {
            throw new Error("Erro ao atualizar:" + error);

        }
    },
    delete: async (id) => {
        try {
            const dependenteDeletado = await Dependente.findByPk(id);
            if (!dependenteDeletado) {
                throw new Error("Usuario não encontrado.");
            }
            await dependenteDeletado.destroy();
            return { msg: "Usuario removido com sucesso." }
        } catch (error) {
            throw error;
        }
    }
};

module.exports = usuarioService;
