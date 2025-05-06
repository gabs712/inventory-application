const pool = require('./pool')

async function getTypes() {
  const { rows } = await pool.query('SELECT * FROM types')
  return rows
}

async function getPokemons(type = null, id = null) {
  const { rows } = await pool.query(
    `
      SELECT pokemons.id, pokemons.name, types.name AS type, hp, attack, notes FROM pokemons
      JOIN pokemon_types ON pokemons.id = pokemon_types.pokemon
      JOIN types ON types.name = pokemon_types.type
      WHERE ($1::text IS NULL OR types.name = $1)
      AND ($2::int IS NULL OR pokemons.id = $2)
    `,
    [type, id],
  )

  return rows
}

async function hasType(type) {
  const { rows } = await pool.query('SELECT * FROM types WHERE name = $1', [
    type,
  ])

  return rows.length >= 1
}

async function insertPokemon(name, type, hp, attack, notes) {
  if (!(await hasType(type))) {
    await pool.query(`INSERT INTO types VALUES($1)`, [type])
  }

  const { rows } = await pool.query(
    `
      INSERT INTO pokemons (name, hp, attack, notes) VALUES ($1, $2, $3, $4) RETURNING id
    `,
    [name, hp, attack, notes],
  )

  const id = rows[0].id

  await pool.query(
    `
      INSERT INTO pokemon_types VALUES ($1, $2)
    `,
    [id, type],
  )
}

module.exports = {
  getTypes,
  getPokemons,
  insertPokemon,
  hasType,
}
