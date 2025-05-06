const { Router } = require('express')
const { getTypes, getPokemons, deleteType } = require('../db/queries')

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

route.post('/:type/delete', async (req, res) => {
  const type = req.params.type

  await deleteType(type)

  res.redirect('/')
})

module.exports = route
