const { Router } = require('express')
const { getTypes, getPokemon } = require('../db/queries')

const root = Router()
const types = getTypes()
const pokemonData = getPokemon()

root.get('/', async (req, res) => {
  res.render('root', { types: await types, pokemonData: await pokemonData })
})

module.exports = root
