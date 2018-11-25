import {Pool} from 'pg';
import {get} from '../../config';

const pool = new Pool({
  user:     get('DATABASE_USERNAME'),
  host:     get('DATABASE_HOST'),
  database: get('DATABASE_NAME'),
  password: get('DATABASE_PASSWORD'),
  port:     get('DATABASE_PORT')
});

export const database = pool;
