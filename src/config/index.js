import dotenv from 'dotenv';

dotenv.config()

export const get = (name, format)  => {
  const config = process.env[name];

  if(typeof config != 'undefined' && config != 'undefined'){
    return config
  }

  return 'undefined'
};