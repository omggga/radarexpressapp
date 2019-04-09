const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')
const path = require('path')

const config = require('./config')

const app = express()

const pgp = require('pg-promise')()
const db = pgp(process.env.PG_CONNECT || config.connectionString)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('db', db)

app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.locals = {
	publicDirectory: path.resolve(__dirname, 'public')
}

require('./routes')(app)

module.exports = app