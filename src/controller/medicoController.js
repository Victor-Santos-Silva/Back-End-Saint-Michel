const medicoService = require("../services/medicoService");

const medicoController = {
  login: async (req, res) => {
    try {
      const login = await medicoService.login(req.body);

      return res.status(200).json({
        msg: "Login realizado com sucesso",
        login,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },

  esqueciSenha: async (req, res) => {
    try {
      const esqueci_senha = await medicoService.esqueciSenha(req.body);

      return res.status(200).json({
        msg: "Senha do medico foi atualizada com sucesso",
        medico: esqueci_senha,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },

  create: async (req, res) => {
    try {
      const novoMedico = await medicoService.create(req.body);

      res.status(201).json({
        mensagem: "Médico cadastrado com sucesso.",
        data: novoMedico,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },

  findById: async (req, res) => {
    try {
      const medico = await medicoService.findById(req.params.id);
      res.status(200).json({
        msg: "Medico encontrado com sucesso.",
        medico,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },

  findAll: async (req, res) => {
    try {
      const medicos = await medicoService.findAll();
      res.status(200).json({
        msg: "Medicos encontrado com sucesso.",
        medicos,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const dadosAtualizados = await medicoService.update(req.body);

      res.status(200).json({
        msg: "Medico atualizado com sucesso.",
        dadosAtualizados,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const resultado = await medicoService.delete(id);
      res.status(200).json({
        msg: "Medico removido com sucesso.",
        resultado,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },

  buscarMedicosPorEspecialidade: async (req, res) => {
    try {
      const medicos = await medicoService.buscarMedicosPorEspecialidade(
        req.body,
      );

      return res.status(200).json({
        msg: "Medicos encontrados com sucesso.",
        medicos,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },
};

module.exports = medicoController;
