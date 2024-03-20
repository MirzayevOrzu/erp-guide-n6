const Joi = require("joi");

exports.createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  role: Joi.string().valid("admin", "employee").required(),
  username: Joi.string().min(4).required(),
  password: Joi.string().min(4).required(),
});

exports.editUserSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  age: Joi.number(),
  role: Joi.string().valid("admin", "employee"),
  username: Joi.string().min(4).required(),
});
