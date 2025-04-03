const AgendamentoDocente = require("../models/agendamentoDocente.js");
const Usuario = require("../models/Usuario.js");

const agendamentoDocenteController = {
  async criarAgendamentoDocente(req, res) {
    try {

      const { especialidade, medico_id, data, hora, nomeCompleto, dataDeNascimento, cpf, rg, genero, endereco, telefone, convenioMedico, planoConvenio, etnia, problema_saude, parentesco, tipoSanguineo, imagemGenero } = req.body;

      // Cria o agendamento no banco de dados
      const agendamentoDeDocente = await AgendamentoDocente.create({
        usuario_id: req.usuarioId,
        especialidade,
        medico_id,
        data,
        hora,
        nomeCompleto, dataDeNascimento, cpf, rg, genero, endereco, telefone, convenioMedico, planoConvenio, etnia, problema_saude, parentesco, tipoSanguineo, imagemGenero
      });

      res.status(201).json({ message: 'Agendamento criado com sucesso!', agendamentoDeDocente });
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao criar agendamento.' });
    }
  },

  async listarAgendamentosDocente(req, res) {
    try {
      const { medico_id } = req.query;
      let agendamentoDocentes;

      if (medico_id) {
        agendamentoDocentes = await AgendamentoDocente.findAll({
          where: { medico_id: medico_id },
          include: [{ model: Usuario }], // Apenas incluir relacionamentos válidos
        });
      } else {
        agendamentoDocentes = await AgendamentoDocente.findAll({
          include: [{ model: Usuario }], // Incluir o usuário sempre
        });
      }

      res.status(200).json({ agendamentoDocentes: agendamentoDocentes });
    } catch (error) {
      console.error("Erro ao listar agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  },


  async obterAgendamentoDocente(req, res) {
    try {
      const { id } = req.params;
      const agendamento = await AgendamentoDocente.findByPk(id);

      if (!agendamento) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }

      res.status(200).json({
        AgendamentosDocentes: agendamento
      });
    } catch (error) {
      console.error("Erro ao obter agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async atualizarAgendamentoDocente(req, res) {
    try {
      const { id } = req.params;
      const { nome, data, cpf, hora, endereco, genero, etnia, problema_saude, parentesco } = req.body;

      const agendamento = await AgendamentoDocente.findByPk(id);
      if (!agendamento) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
      }

      await AgendamentoDocente.update(
        { nome, data, cpf, hora, endereco, genero, etnia, problema_saude, parentesco },
        { where: { id } }
      );
      res.status(200).json({ message: "Agendamento atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async deletarAgendamentoDocente(req, res) {
    try {
      const { id } = req.params;
      const agendamentoDocente = await AgendamentoDocente.findByPk(id);

      if (!agendamentoDocente) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
      }
      await agendamentoDocente.destroy();
      res.status(200).json({ message: 'Agendamento deletado com sucesso!' });
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = agendamentoDocenteController;
