const { Router } = require('express')
const { getTypes, getPokemons } = require('../db/queries')

const root = Router()
const types = getTypes()

root.get('/:types', async (req, res) => {
  const pokemons = getPokemons(req.params.types)

  res.render('main', {
    types: await types,
    pokemons: await pokemons,
    title: 'Home | ' + req.params.types,
  })
})

module.exports = root
