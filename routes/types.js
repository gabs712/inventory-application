const { Router } = require('express')
const { getTypes, getPokemons } = require('../db/queries')

const route = Router()

route.get('/:type', async (req, res) => {
  const types = getTypes()
  const pokemons = getPokemons(req.params.type)

  res.render('main', {
    types: await types,
    pokemons: await pokemons,
    title: 'Types | ' + req.params.type,
  })
})

module.exports = route
