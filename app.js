const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')
const path = require('path')

const config = require('./config')

const app = express()

const pgp = require('pg-promise')()
const PG_CONNECT = 'postgres://front:priX1Fuewl5iT7Op1E@193.176.79.194:5432/radar3?ssl=true'
const db = pgp(PG_CONNECT || config.connectionString)

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
		db.any('SELECT "from", "to", dates, visa, pricelimit FROM public.users where userkey = $1', [id]).then(function(data) {
			if (data && data.length > 0) {
				res.send(data)
			} else {
				res.send({ error: 'No data belongs to this user. Its a new radar bro.' })
			}
		})
		.catch(function(error) {
			res.sendStatus(500)
		})
	}
})

app.get('/get/countries', (req, res) => {
	db.any('SELECT ROW_NUMBER() OVER () AS id, country, region FROM public.countries').then(function(data) {
		if (data && data.length > 0) {
			const result = []
			let branch = "t"
			let index = 1
			data.forEach((item) => {
				const existing = result.filter(function(v, i) {
					return v.label == item.region
				})
				if (existing.length) {
					const existingIndex = result.indexOf(existing[0])
					result[existingIndex].children = result[existingIndex].children.concat({ id: +item.id, label: item.country})
				} else {
					const el = {
						id: branch+index,
						label: item.region,
						children: [
							{ id: +item.id, label: item.country}
						]
					}
					result.push(el)
					index++
				}
			})
			result.forEach((item) => {
				item.children.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
			})
			const resultArray = []
			result.forEach((item) => {
				resultArray.push({ "header": item.label })
				if(item.children.length > 0){
					for(el of item.children) {
						resultArray.push({ "name": el.label, "group": item.label })
					}
				}
			})


			res.send(JSON.stringify(resultArray))
		} else {
			res.sendStatus(500)
		}
	})
	.catch(function(error) {
		res.sendStatus(500)
	})
})

app.get('/get/countries_from', (req, res) => {
	db.any('SELECT name FROM public.from').then(function(data) {
		if (data && data.length > 0) {
			var resultArr = []
			for (el of data) {
				resultArr.push(el.name)
			}
			res.send(JSON.stringify(resultArr))
		} else {
			res.sendStatus(500)
		}
	})
	.catch(function(error) {
		res.sendStatus(500)
	})
})

app.post('/save', (req, res) => {
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.sendStatus(500)
	} else {
		const key = req.body.userkey
		const from = JSON.stringify(req.body.from)
		const to = JSON.stringify(req.body.to)
		const dates = JSON.stringify(req.body.dates)
		const visa = JSON.stringify(req.body.visa)
		const pricelimit = req.body.price

		if (!key) {
			res.sendStatus(500)
		}

		db.any('SELECT * FROM public.users where userkey = $1', [key]).then(function(data) {
			if (data && data.length > 0 ) {
				db.any('UPDATE public.users SET "from" = $2, "to" = $3, dates = $4, visa = $5, pricelimit = $6 where userkey = $1', [key, from, to, dates, visa, pricelimit]).then(function(response) {
					res.sendStatus(200)
				})
			} else {
				db.any('INSERT INTO public.users (userkey, "from", "to", dates, visa, pricelimit) VALUES ($1, $2, $3, $4, $5, $6)', [key, from, to, dates, visa, pricelimit]).then(function(response) {
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