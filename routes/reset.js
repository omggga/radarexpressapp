const express = require('express')
const router = express.Router()

router.post('/clear/:id', (req, res) => {
	const id = req.params.id
	if (!id) {
		res.sendStatus(500)
	} else {
		const date_added = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
		req.app.get('db').any('UPDATE account SET place_from = $2, place_to = $3, dates = $4, visa = $5, pricelimit = $6, date_added = $7 where userkey == $1', [id, '', '', '', '', '', date_added]).then(function(res) {
			res.sendStatus(200)
		})
		.catch(function(error) {
			res.sendStatus(500)
		})
	}
})

module.exports = router