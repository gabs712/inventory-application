const { Router } = require('express')
const root = Router()

root.get('/', (req, res) => {
  res.render('root')
})

module.exports = root
