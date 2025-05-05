const { Router } = require('express')
const { getTypes, getPokemons } = require('../db/queries')

const route = Router()
const types = getTypes()
const pokemons = getPokemons()

route.get('/', async (req, res) => {
  res.render('main', {
    types: await types,
    pokemons: await pokemons,
    title: 'Home',
  })
})

module.exports = route
