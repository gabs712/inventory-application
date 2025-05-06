const { Router } = require('express')
const {
  getTypes,
  getPokemons,
  editPokemon,
  deletePokemon,
  hasId,
} = require('../db/queries')
const { validationResult, param } = require('express-validator')
const checkForm = require('../utils/checkForm')

const route = Router()

function checkId() {
  return [
    param('id').custom(async (value) => {
      if (!(await hasId(value))) throw new Error('Id does not exist')

      return true
    }),
  ]
}
route.get('/:id/edit', checkId(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render('error', { errors: errors.array() })
    return
  }
  const pokemonId = req.params.id
  const pokemon = (await getPokemons(null, pokemonId))[0]

  res.render('form', {
    pokemon: pokemon,
    types: await getTypes(),
    action: 'Edit',
  })
})

route.post('/:id/edit', checkId(), checkForm, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render('error', { errors: errors.array() })
    return
  }

  const id = req.params.id
  const { name, type, hp, attack, notes } = req.body

  await editPokemon(id, name, type, hp, attack, notes)

  res.redirect('/')
})

route.post('/:id/delete', checkId(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render('error', { errors: errors.array() })
    return
  }

  const id = req.params.id

  await deletePokemon(id)

  const referer = req.get('Referer') || '/'
  res.redirect(referer)
})

module.exports = route
