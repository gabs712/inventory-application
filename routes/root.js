const { Router } = require('express')
const { getTypes, getPokemons } = require('../db/queries')

const root = Router()
const types = getTypes()
const pokemons = getPokemons()

root.get('/', async (req, res) => {
  res.render('root', { types: await types, pokemons: await pokemons })
})

module.exports = root
