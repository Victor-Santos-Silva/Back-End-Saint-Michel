const AgendamentoDocente = require('../models/agendamentoDocente');
const ProntuarioDocente = require('../models/ProntuarioDocente');
const Usuario = require('../models/Usuario'); // Se necessário para histórico
const { Op } = require('sequelize');

const consultaDocenteService = {
  async concluirConsultaParente({ agendamento_id, problemaRelatado, recomendacaoMedico }) {
    // Buscar o agendamento no modelo AgendamentoDocente para garantir consistência
    const agendamento = await AgendamentoDocente.findByPk(agendamento_id);
    if (!agendamento) {
      throw new Error('Agendamento não encontrado.');
    }
    // Criar um novo prontuário vinculado ao agendamento
    await ProntuarioDocente.create({
      agendamento_id,  // Associando o prontuário com o agendamento
      problemaRelatado,
      recomendacaoMedico
    });
    console.log('Novo prontuário criado');
    // Atualizar o agendamento para finalizado
    await AgendamentoDocente.update(
      { status: 'finalizado' },
      { where: { id: agendamento_id } }
    );
    console.log('Agendamento finalizado');

    return { message: 'Consulta finalizada com sucesso.' };
  },

  async marcarComoNaoCompareceuParente(agendamento_id) {
    const agendamento = await AgendamentoDocente.findByPk(agendamento_id);
    if (!agendamento) {
      throw new Error('Agendamento não encontrado.');
    }

    await AgendamentoDocente.update(
      { status: 'nao_compareceu' },
      { where: { id: agendamento_id } }
    );

    // Verifica se já tem prontuário
    const prontuarioExistente = await ProntuarioDocente.findOne({
      where: { agendamento_id }
    });

    if (!prontuarioExistente) {
      await ProntuarioDocente.create({
        agendamento_id,
        problemaRelatado: 'Paciente não compareceu.',
        recomendacaoMedico: 'Reagendar.',
      });
    }

    return { message: 'Paciente marcado como não compareceu.' };
  },


  async listarHistoricoParente() {
    const consultasFinalizadas = await AgendamentoDocente.findAll({
      where: {
        [Op.or]: [
          { status: 'finalizado' },
          { status: 'nao_compareceu' }
        ]
      },
      include: [
        { model: ProntuarioDocente },
        { model: Usuario, as: 'usuario' } // Ajuste o alias se necessário
      ]
    });

    return consultasFinalizadas;
  }


};

module.exports = consultaDocenteService;
