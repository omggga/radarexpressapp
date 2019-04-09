const express = require('express')
const router = express.Router()

router.get('/get/:form', (req, res) => {
	const formtype = req.params.form
	if (!formtype) {
		res.sendStatus(500)
	} else {
		req.app.get('db').any('SELECT * FROM $1:name', formtype).then(function(data) {
			debugger
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
			debugger
			res.sendStatus(500)
		})
	}
})

module.exports = router