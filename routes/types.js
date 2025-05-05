const { Router } = require('express')
const { getTypes, getPokemons } = require('../db/queries')

const route = Router()
const types = getTypes()

route.get('/:types', async (req, res) => {
  const pokemons = getPokemons(req.params.types)

  res.render('main', {
    types: await types,
    pokemons: await pokemons,
    title: 'Home | ' + req.params.types,
  })
})

module.exports = route
