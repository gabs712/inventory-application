const { Router } = require('express')
const { getTypes } = require('../db/queries')

const root = Router()
const types = getTypes()

root.get('/', async (req, res) => {
  res.render('root', { types: await types })
})

module.exports = root
