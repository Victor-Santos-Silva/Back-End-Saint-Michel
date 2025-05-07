const model = require('../models/notificationModel');
 
async function create(data) {
  return await model.createNotification(data);
}
 
async function list(user_id) {
  return await model.getNotifications(user_id);
}
 
async function read(id) {
  return await model.markAsRead(id);
}
 
async function remove(id) {
  return await model.deleteNotification(id);
}
 
module.exports = {
  create,
  list,
  read,
  remove,
};