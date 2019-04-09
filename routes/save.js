const express = require('express')
const router = express.Router()

router.post('/save', (req, res) => {
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.sendStatus(500)
	} else {
		const key = req.body.key
		const from = req.body.from
		const to = req.body.to
		const visa = req.body.visa
		const dates = req.body.dates
		const price = req.body.price

		req.app.get('db').any('SELECT * FROM account where userkey == $1', [key]).then(function(data) {
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

module.exports = router