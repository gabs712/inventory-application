const pool = require('./pool')

async function getTypes() {
  const { rows } = await pool.query('SELECT * FROM types')
  return rows
}

async function getPokemons(type = null) {
  const { rows } = await pool.query(
    `SELECT pokemons.id, pokemons.name, types.name AS type, hp, attack, notes FROM pokemons
      JOIN pokemon_types ON pokemons.id = pokemon_types.pokemon
      JOIN types ON types.name = pokemon_types.type
      WHERE $1::text IS NULL OR types.name = $1
    `,
    [type],
  )

  return rows
}

module.exports = {
  getTypes,
  getPokemons,
}
