const { Router } = require('express')
const { getTypes, getPokemons } = require('../db/queries')

const route = Router()

route.get('/:id/edit', async (req, res) => {
  const pokemonId = req.params.id

  res.send('test ' + pokemonId)
})

module.exports = route
