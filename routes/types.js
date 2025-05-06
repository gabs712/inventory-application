const { Router } = require('express')
const { getTypes, getPokemons } = require('../db/queries')

const route = Router()

route.get('/:types', async (req, res) => {
  const types = getTypes()
  const pokemons = getPokemons(req.params.types)

  res.render('main', {
    types: await types,
    pokemons: await pokemons,
    title: 'Types | ' + req.params.types,
  })
})

module.exports = route
