const db = require('../db');
const pgp = require('pg-promise')({
    capSQL: true // generate capitalized SQL 
});

module.exports = class UserModel {

    //Creates a new User record
    async create(data){
        try {
            //Generrta SQL using helpers from pg-promise
            const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';

            //Execute SQL statment
            const result = await db.query(statement);

            if(result.rows?.length){
                return result.rows[0];
            }

            return null;

        } catch (err) {
            throw new Error(err);
        }
    }

    //User update
    async update(data){
        try {
            const { id, ...params } = data;

            //Generrta SQL using helpers from pg-promise
            const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
            const statement = pgp.helpers.update(params, null, 'users') + condition;

                  // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

        } catch (err) {
           throw new Error(err); 
        }
    }

    //Find user by email
    async findOneByEmail(email) {
        try {
    
          // Generate SQL statement
          const statement = `SELECT *
                             FROM users
                             WHERE email = $1`;
          const values = [email];
      
          // Execute SQL statment
          const result = await db.query(statement, values);
    
          if (result.rows?.length) {
            return result.rows[0]
          }
      
          return null;
    
        } catch(err) {
          throw new Error(err);
        }
      }
    
    //Finds a user record by Id
    async findOneById(id) {
      try {
        // Generate SQL statement
        const statement = `SELECT *
                           FROM users
                           WHERE id = $1`;
        const values = [id];
    
        // Execute SQL statment
        const result = await db.query(statement, values);
        if (result.rows?.length) {
          return result.rows[0]
        }
    
        return null;
      } catch(err) {
        throw new Error(err);
      }
    }
};