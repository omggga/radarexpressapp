const express = require('express')
const router = express.Router()

router.get('/user/:id', (req, res) => {
	const id = req.params.id
	if (!id) {
		res.sendStatus(500)
	} else {
		req.app.get('db').any('SELECT * FROM account where user_id = $1', [id]).then(function(data) {
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

module.exports = router