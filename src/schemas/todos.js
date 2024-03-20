const Joi = require("joi");

exports.createTodoSchema = Joi.object({
  user_id: Joi.string().uuid({ version: "uuidv4" }).required(),
  guide_id: Joi.string().uuid({ version: "uuidv4" }).required(),
});
