const { Router } = require('express')
const { getPokemons } = require('../db/queries')

const route = Router()

route.get('/:id/edit', async (req, res) => {
  const pokemonId = req.params.id
  const pokemon = (await getPokemons(null, pokemonId))[0]

  res.render('edit', { pokemon: pokemon })
})

module.exports = route
