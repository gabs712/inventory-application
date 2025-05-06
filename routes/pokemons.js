const { Router } = require('express')
const {
  getTypes,
  getPokemons,
  editPokemon,
  deletePokemon,
} = require('../db/queries')

const route = Router()

route.get('/:id/edit', async (req, res) => {
  const pokemonId = req.params.id
  const pokemon = (await getPokemons(null, pokemonId))[0]

  res.render('form', {
    pokemon: pokemon,
    types: await getTypes(),
    action: 'Edit',
  })
})

route.post('/:id/edit', async (req, res) => {
  const id = req.params.id
  const { name, type, hp, attack, notes } = req.body

  await editPokemon(id, name, type, hp, attack, notes)

  res.redirect('/')
})

route.post('/:id/delete', async (req, res) => {
  const id = req.params.id

  await deletePokemon(id)

  const referer = req.get('Referer') || '/'
  res.redirect(referer)
})

module.exports = route
