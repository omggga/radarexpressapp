const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')

const config = require('./config')

const app = express()
const port = config.port

const pgp = require('pg-promise')()
const db = pgp(process.env.PG_CONNECT || config.connectionString)

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cors())

app.set('db', db)
require('./routes')(app)

app.listen(process.env.PORT || config.port, () => console.log(`Radarprice app listening on port ${process.env.PORT || config.port}!`))