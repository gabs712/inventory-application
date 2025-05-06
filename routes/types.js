const { Router } = require('express')
const { getTypes, getPokemons, deleteType, hasType } = require('../db/queries')
const { param, validationResult } = require('express-validator')

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

route.post(
  '/:type/delete',
  [
    param('type').custom(async (value) => {
      if (!(await hasType(value))) throw new Error('Type does not exist')

      return true
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.redirect('/')
      return
    }

    const type = req.params.type

    await deleteType(type)

    res.redirect('/')
  },
)

module.exports = route
