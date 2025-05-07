const Joi = require('joi');

const createSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  title: Joi.string().min(1).required(),
  message: Joi.string().min(1).required(),
});

module.exports = {
  createSchema,
};
