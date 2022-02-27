import Joi from 'joi';

export const registerValidator = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).alphanum(),
  confirmPassword: Joi.ref('password'),
});

export const loginValidator = Joi.object({
  username: Joi.string().min(3),
  email: Joi.string().email(),
  password: Joi.string().min(5).alphanum(),
});
