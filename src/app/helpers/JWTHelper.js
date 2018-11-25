import jwt from 'jsonwebtoken';
import {get} from '../../config';

const APP_SECRET = get('APP_SECRET');

export function sign(payload) {
  return new Promise( (resolve, reject) => {
    jwt.sign(
      payload,
      APP_SECRET,
      {expiresIn: get('TOKEN_EXPIRY_TIME')},
      (err, token) => {
        err ? reject(err) : resolve(token);
      }
    );
  })
}

export function verify(token) {
  return new Promise( (resolve, reject) => {
    jwt.verify(token, APP_SECRET, (err, decoded) => {
      err 
        ? reject("failed to authenticate. Access token not valid")
        : resolve(decoded);
    })
  });
}