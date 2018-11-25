import Joi from 'joi';

export const signupShcema = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  othernames: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});