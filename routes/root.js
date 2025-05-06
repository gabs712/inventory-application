const { Router } = require('express')
const { getTypes, getPokemons } = require('../db/queries')

const route = Router()

route.get('/', async (req, res) => {
  const types = getTypes()
  const pokemons = getPokemons()

  res.render('main', {
    types: await types,
    pokemons: await pokemons,
    title: 'Home',
  })
})

module.exports = route
