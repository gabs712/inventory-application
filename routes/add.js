const { Router } = require('express')
const { getTypes, insertPokemon } = require('../db/queries')

const route = Router()

route.get('/', async (req, res) => {
  res.render('form', {
    types: await getTypes(),
    action: 'Add',
  })
})

route.post('/', async (req, res) => {
  const { name, type, hp, attack, notes } = req.body

  await insertPokemon(name, type, hp, attack, notes)
  res.redirect('/')
})

module.exports = route
