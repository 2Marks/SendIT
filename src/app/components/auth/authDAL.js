import {database} from '../../database';

export class AuthDAL {
  static async getUser(email) {
    const query  = 'SELECT * from users where email = $1 or username = $1 LIMIT 1';
    const values = [email];
    const result = await database.query(query, values);

    return result.rows.length > 0 ? result.rows[0] : {};
  }

  static async createUser(params) {
    const query = `
      INSERT INTO users(firstname, lastname, othernames, email, username, password, registered)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;
    const values = Object.values(params);
    const result = await database.query(query, values);

    return result.rows[0];
  }
}