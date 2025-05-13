// services/notificationService.js
const Notificacao = require('../models/Notificacao');  // Certifique-se de importar o modelo corretamente

async function create(data) {
  try {
    const notificacao = await Notificacao.create(data);  // Usando o método correto do Sequelize
    return notificacao;  // Retorna a notificação criada
  } catch (err) {
    console.error('Erro real ao criar notificação:', err);  // Exibe o erro real para facilitar a depuração
    throw err;  // Lança o erro para ser tratado na camada superior
  }
}

async function list(user_id) {
  try {
    const notificacoes = await Notificacao.findAll({
      where: { user_id },  // Filtra as notificações pelo user_id
      order: [['createdAt', 'DESC']],  // Ordena por data de criação (decrescente)
    });
    return notificacoes;  // Retorna a lista de notificações
  } catch (err) {
    console.error('Erro ao buscar notificações:', err);
    throw err;
  }
}

async function read(id) {
  try {
    await Notificacao.update(
      { lida: true },  // Marca como lida
      { where: { id } }  // Filtra pela notificação específica
    );
  } catch (err) {
    console.error('Erro ao marcar notificação como lida:', err);
    throw err;
  }
}

async function remove(id) {
  try {
    await Notificacao.destroy({ where: { id } });  // Remove a notificação
  } catch (err) {
    console.error('Erro ao remover notificação:', err);
    throw err;
  }
}

module.exports = {
  create,
  list,
  read,
  remove,
};
