const { Router } = require('express')
const { getTypes } = require('../db/queries')

const route = Router()

route.get('/', async (req, res) => {
  res.render('form', {
    types: await getTypes(),
    action: 'Add',
  })
})

route.post('/', async (req, res) => {
  res.redirect('/')
})

module.exports = route
