const AgendamentoTitular = require('../models/agendamentoTitular');
const ProntuarioTitular = require('../models/ProntuarioTitular');
const Usuario = require('../models/Usuario'); // Se necessário para histórico
const { Op } = require('sequelize');

const consultatitularService = {
  async concluirConsultaParente({ agendamento_id, problemaRelatado, recomendacaoMedico }) {
    // Buscar o agendamento no modelo AgendamentoTitular para garantir consistência
    const agendamento = await AgendamentoTitular.findByPk(agendamento_id);
    if (!agendamento) {
      throw new Error('Agendamento não encontrado.');
    }
    // Criar um novo prontuário vinculado ao agendamento
    await ProntuarioTitular.create({
      agendamento_id,  // Associando o prontuário com o agendamento
      problemaRelatado,
      recomendacaoMedico
    });
    console.log('Novo prontuário criado');
    // Atualizar o agendamento para finalizado
    await AgendamentoTitular.update(
      { status: 'finalizado' },
      { where: { id: agendamento_id } }
    );
    console.log('Agendamento finalizado');

    return { message: 'Consulta finalizada com sucesso.' };
  },

  async marcarComoNaoCompareceuParente(agendamento_id) {
    const agendamento = await AgendamentoTitular.findByPk(agendamento_id);
    if (!agendamento) {
      throw new Error('Agendamento não encontrado.');
    }

    await AgendamentoTitular.update(
      { status: 'nao_compareceu' },
      { where: { id: agendamento_id } }
    );

    // Verifica se já tem prontuário
    const prontuarioExistente = await ProntuarioTitular.findOne({
      where: { agendamento_id }
    });

    if (!prontuarioExistente) {
      await ProntuarioTitular.create({
        agendamento_id,
        problemaRelatado: 'Paciente não compareceu.',
        recomendacaoMedico: 'Reagendar.',
      });
    }

    return { message: 'Paciente marcado como não compareceu.' };
  },


  async listarHistoricoParente() {
    const consultasFinalizadas = await AgendamentoTitular.findAll({
      where: {
        [Op.or]: [
          { status: 'finalizado' },
          { status: 'nao_compareceu' }
        ]
      },
      include: [
        { model: ProntuarioTitular },
        { model: Usuario, as: 'usuario' } // Ajuste o alias se necessário
      ]
    });

    return consultasFinalizadas;
  }


};

module.exports = consultatitularService;
