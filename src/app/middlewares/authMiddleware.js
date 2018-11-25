
import * as JWTHelper from '../helpers/JWTHelper';
import { UnprocessableEntityError } from '../helpers/errorsHelper';

export async function authMiddleware(req, res, next) {
  const token = req.headers['x-access-token'] || req.body['x-access-token'];

  if(!token){
    next( new UnprocessableEntityError('No access token provided') );
  }

  const user = await JWTHelper.verify(token);
  req.user = user;

  next();

}