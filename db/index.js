const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

// pools will use environment variables
// for connection information
const pool = new Pool({
  user:      process.env.PGUSER,
  host:      process.env.PGHOST,
  database:  process.env.PGDATABASE,
  password:  process.env.PGPASSWORD,
  port:      process.env.PGPORT
});


// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// })

module.exports = {
  query: (text, params) => pool.query(text, params)
}