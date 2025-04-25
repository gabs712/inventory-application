require('dotenv').config()

const path = require('node:path')
const express = require('express')
const root = require('./routes/root')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath))
app.use(express.urlencoded({ extended: true }))

app.use('/', root)

app.listen(process.env.PORT)
