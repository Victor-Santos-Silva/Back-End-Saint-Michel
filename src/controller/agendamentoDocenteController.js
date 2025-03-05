const AgendamentoDocente = require("../models/agendamentoDocente.js");

const agendamentoDocenteController = {
  async criarAgendamento(req, res) {
    try {
      const {
        medico_id,
        especialidade,
        nome,
        data,
        hora,
        cpf,
        endereco,
        genero,
        etnia,
        problema_saude,
        parentesco,
        convenioMedico,
        planoConvenio,
        tipoSanguineo,
      } = req.body;

      if (
        !medico_id ||
        !especialidade ||
        !nome ||
        !data ||
        !hora ||
        !cpf ||
        !endereco ||
        !genero ||
        !etnia ||
        !problema_saude ||
        !parentesco ||
        !convenioMedico ||
        !planoConvenio ||
        !tipoSanguineo
      ) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
      }

      const novoAgendamento = await AgendamentoDocente.create({
        usuario_id: req.usuarioId, // Obtém o ID do usuário do middleware
        medico_id,
        especialidade,
        nome,
        data,
        hora,
        cpf,
        endereco,
        genero,
        etnia,
        problema_saude,
        parentesco,
        convenioMedico,
        planoConvenio,
        tipoSanguineo,
      });

      res.status(201).json({ message: 'Agendamento criado com sucesso!', agendamento: novoAgendamento });
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao criar agendamento.' });
    }
  },

  async listarAgendamentosDocente(req, res) {
    try {
      const agendamentos = await AgendamentoDocente.findAll();
      res.status(200).json(agendamentos);
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

      res.status(200).json(agendamento);
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
