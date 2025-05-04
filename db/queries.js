const pool = require('./pool')

async function getTypes() {
  const { rows } = await pool.query('SELECT * FROM types')
  return rows
}

module.exports = {
  getTypes,
}
