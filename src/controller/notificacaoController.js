const service = require('../services/notificationService');
const { Notificacao } = require('../models');
const { createSchema } = require('../middlewares/notificationValidator');
 
async function create(req, res) {
  const { error } = createSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
 
  try {
    const id = await service.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    console.error('Erro real ao criar notificação:', err);
  }
}
 
async function list(req, res) {
  try {
    const user_id = parseInt(req.params.user_id);
    const data = await service.list(user_id);
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar notificações' });
  }
}
 
const markRead = async (id) => {
  try {
    const notificationId = Number(id); // Garante que o `id` seja um número

    // Verifica se a notificação existe
    const notification = await Notificacao.findOne({ where: { id: notificationId } });

    if (!notification) {
      throw new Error('Notificação não encontrada');
    }

    // Se a notificação já estiver marcada como lida, não faz nada
    if (notification.lida) {
      throw new Error('Notificação já foi marcada como lida');
    }

    // Atualiza a notificação como lida
    const updatedNotification = await Notificacao.update(
      { lida: true }, // Dados a serem atualizados
      { where: { id: notificationId } } // Certifique-se de que `id` é um número
    );

    if (updatedNotification[0] === 0) {
      throw new Error('Falha ao marcar a notificação como lida');
    }

    return updatedNotification;
  } catch (error) {
    console.error("Erro ao marcar como lida:", error);
    throw error;  // Lança o erro para ser tratado na camada superior
  }
};
 
async function remove(req, res) {
  try {
    await service.remove(req.params.id);
    res.json({ message: 'Notificação removida' });
  } catch {
    res.status(500).json({ error: 'Erro ao remover notificação' });
  }
}
 
module.exports = {
  create,
  list,
  markRead,
  remove,
};