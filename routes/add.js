const { Router } = require('express')
const { getTypes, insertPokemon } = require('../db/queries')
const checkForm = require('../utils/checkForm')
const { validationResult } = require('express-validator')

const route = Router()

route.get('/', async (req, res) => {
  res.render('form', {
    types: await getTypes(),
    action: 'Add',
  })
})

route.post('/', checkForm, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render('error', { errors: errors.array() })
    return
  }

  const { name, type, hp, attack, notes } = req.body

  await insertPokemon(name, type, hp, attack, notes)
  res.redirect('/')
})

module.exports = route
