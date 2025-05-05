const { Router } = require('express')
const { getTypes, getPokemons } = require('../db/queries')

const root = Router()
const types = getTypes()

root.get('/:id/edit', async (req, res) => {
  const pokemonId = req.params.id

  res.send('test ' + pokemonId)
})

module.exports = root
