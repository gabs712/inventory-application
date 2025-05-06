const pool = require('./pool')

async function getTypes() {
  const { rows } = await pool.query('SELECT * FROM types ORDER BY name')
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
      ORDER by pokemons.id
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

async function deleteEmptyTypes() {
  await pool.query(`
    DELETE FROM types
    WHERE NOT EXISTS (
      SELECT type FROM pokemon_types
      WHERE types.name = pokemon_types.type
    )
  `)
}

async function editPokemon(id, name, type, hp, attack, notes) {
  if (!(await hasType(type))) {
    await pool.query(`INSERT INTO types VALUES($1)`, [type])
  }

  await pool.query(
    `
      UPDATE pokemons
        set name = $1,
        hp = $2,
        attack = $3,
        notes = $4
      WHERE id = $5
    `,
    [name, hp, attack, notes, id],
  )

  await pool.query(
    `
    UPDATE pokemon_types
      set type = $1
    WHERE pokemon = $2
  `,
    [type, id],
  )

  await deleteEmptyTypes()
}

async function deletePokemon(id) {
  await pool.query('DELETE FROM pokemon_types WHERE pokemon = $1', [id])
  await pool.query('DELETE FROM pokemons WHERE id = $1', [id])

  await deleteEmptyTypes()
}

module.exports = {
  getTypes,
  getPokemons,
  insertPokemon,
  editPokemon,
  deletePokemon,
}
