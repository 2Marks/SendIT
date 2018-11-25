import Joi from 'joi';
import {signupShcema, loginSchema} from './authSchema';
import {JoiValidationError} from '../../helpers/errorsHelper';
import {AuthService} from './authService';

export async function signup(params) {
  const {error, value} = Joi.validate(params, signupShcema);

  if(error){
    throw new JoiValidationError('Validation Error occured on user signup Payload',error);
  }

  const data = await AuthService.signup(value);

  return {
    data,
    message: 'User created successfully'
  }
}

export async function login(params) {
  const {error, value} = Joi.validate(params, loginSchema);

  if(error){
    throw new JoiValidationError('Validation Error occured on user login Payload',error);
  }

  const data = await AuthService.login(value);

  return {
    data,
    message: 'User logged In successfully'
  }
}
