require('dotenv').config()

const path = require('node:path')
const express = require('express')
const rootRouter = require('./routes/root')
const typesRouter = require('./routes/types')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath))
app.use(express.urlencoded({ extended: true }))

app.use('/', rootRouter)
app.use('/types', typesRouter)

app.listen(process.env.PORT)
