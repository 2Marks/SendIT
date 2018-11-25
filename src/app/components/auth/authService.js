import bcrypt from 'bcryptjs';
import {AuthDAL} from './authDAL';
import { ResourceNotFoundError, ResourceExistError, UnauthenticatedError } from '../../helpers/errorsHelper';
import {sign} from '../../helpers/JWTHelper';

const SALT_ROUNDS = 8;

export class AuthService {
  static async signup(params) {
    const user = await AuthDAL.getUser(params.email);

    if(Object.values(user).length > 0){
      throw new ResourceExistError(`User with email(${params.email}) already exists`);
    }

    const password    = await bcrypt.hash(params.password, SALT_ROUNDS); 
    const createdUser = await AuthDAL.createUser(
      Object.assign({}, params, {password, registered: new Date()})
    );
    delete createdUser.password;
    const userToken   = await sign(createdUser);

    return [{
      token: userToken,
      user: createdUser
    }];
  }

  static async login(params) {
    const user = await AuthDAL.getUser(params.username);

    if(Object.values(user).length <= 0){
      throw new ResourceNotFoundError('User not found')
    }

    const isPasswordValid = await bcrypt.compare(params.password, user.password);

    if(!isPasswordValid) {
      throw new UnauthenticatedError('Password is incorrect');
    }

    delete user.password;
    const userToken   = await sign(user);

    return [{
      token: userToken,
      user
    }];
  }
}