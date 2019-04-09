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

app.get('/', (req, res) => {
	res.sendStatus(200)
})

app.get('/user/:id', (req, res) => {
	const id = req.params.id
	if (!id) {
		res.sendStatus(500)
	} else {
		db.any('SELECT * FROM account where user_id = $1', [id]).then(function(data) {
			if (data && data.length > 0) {
				res.send(data)
			} else {
				res.send({ error: 'No data belongs to this user' })
			}
		})
		.catch(function(error) {
			res.sendStatus(500)
		})
	}
})

app.get('/get/:form', (req, res) => {
	const formtype = req.params.form
	if (!formtype) {
		res.sendStatus(500)
	} else {
		db.any('SELECT * FROM $1:name', formtype).then(function(data) {
			if (data && data.length > 0) {
				var resultArr = []
				for (el of data) {
					resultArr.push(el.country)
				}
				res.send(resultArr)
			} else {
				res.sendStatus(500)
			}
		})
		.catch(function(error) {
			res.sendStatus(500)
		})
	}
})

app.post('/save', (req, res) => {
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.sendStatus(500)
	} else {
		const key = req.body.key
		const from = req.body.from
		const to = req.body.to
		const visa = req.body.visa
		const dates = req.body.dates
		const price = req.body.price

		db.any('SELECT * FROM account where userkey == $1', [key]).then(function(data) {
			if (data && data.length > 0 ) {
				const date_added = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
				db.any('UPDATE account SET place_from = $2, place_to = $3, dates = $4, visa = $5, pricelimit = $6, date_added = $7 where userkey == $1', [key, place_from, place_to, dates, visa, pricelimit, date_added]).then(function(res) {
					res.sendStatus(200)
				})
			} else {
				db.any('INSERT INTO account (place_from, place_to, dates, visa, pricelimit, date_added) VALUES($2, $3, $4, $5, $6, $7) where userkey == $1', [key, place_from, place_to, dates, visa, pricelimit, date_added]).then(function(res) {
					console.log('Inserted', res)
					res.sendStatus(200)
				})
			}
		})
		.catch(function(error) {
			res.sendStatus(500)
		})
	}
})


module.exports = app