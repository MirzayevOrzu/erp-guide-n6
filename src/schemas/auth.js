const Joi = require("joi");

exports.loginSchema = Joi.object({
  username: Joi.string()
    .min(4) // .message("Kamida 4 ta harf bo'lishi kerak")
    .required(),
  password: Joi.string().min(4).required(),
});
