const { Router } = require('express')
const { getTypes, getPokemons } = require('../db/queries')

const route = Router()

route.get('/:id/edit', async (req, res) => {
  const pokemonId = req.params.id
  const pokemon = (await getPokemons(null, pokemonId))[0]

  res.render('form', {
    pokemon: pokemon,
    types: await getTypes(),
    action: 'Edit',
  })
})

module.exports = route
