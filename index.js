const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')

const app = express()
const port = 3000

const pgp = require('pg-promise')()
const connection = 'postgres://qvduspzt:nqQSJHteBSE1_APAMeQHFP6h7FhuGipl@balarama.db.elephantsql.com:5432/qvduspzt'
//https://api.elephantsql.com/console/2902d413-c14f-452e-be8f-1a29d4ffaf12/details?

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cors())

const db = pgp(connection)

app.get('/', (req, res) =>  {
	res.sendStatus(200)
})


//Get form data to create html form
app.get('/get/:form', (req, res) =>  {

	const formtype = request.params.form
	if (!formtype) {
		res.sendStatus(500)
	} else {
		db.any('SELECT * FROM $1', [formtype]).then(function(data) {

			if (data && data.length > 0) {
				res.send(data)
			} else {
				res.sendStatus(500)
			}
		})
		.catch(function(error) {
			res.sendStatus(500)
		})
	}

})


//Get user data to fill html form
app.get('/user/:id', (req, res) =>  {

	const id = request.params.id
	if (!id) {
		res.sendStatus(500)
	} else {
		db.any('SELECT * FROM account where userkey = $1', [id]).then(function(data) {

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


//Save form data on submit
app.post('/save', (req, res) =>  {

	if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.sendStatus(500)
	} else {
		const key = req.body.key
		const from = req.body.from
		const to = req.body.to
		const visa = req.body.visa
		const dates = req.body.dates
		const price = req.body.price

		console.log('Starting db insert')
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


//Clear form
app.post('/clear/:id', (req, res) =>  {

	const id = request.params.id
	if (!id) {
		res.sendStatus(500)
	} else {
		const date_added = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
		db.any('UPDATE account SET place_from = $2, place_to = $3, dates = $4, visa = $5, pricelimit = $6, date_added = $7 where userkey == $1', [id, '', '', '', '', '', date_added]).then(function(res) {
			res.sendStatus(200)
		})
		.catch(function(error) {
			res.sendStatus(500)
		})
	}

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))