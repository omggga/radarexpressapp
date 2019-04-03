const express = require('express')
const app = express()
const port = 3000

const pgp = require('pg-promise')()
const connection = 'postgres://qvduspzt:nqQSJHteBSE1_APAMeQHFP6h7FhuGipl@balarama.db.elephantsql.com:5432/qvduspzt'
//https://api.elephantsql.com/console/2902d413-c14f-452e-be8f-1a29d4ffaf12/details?


app.get('/', (req, res) =>  {

	const db = pgp(connection)
	db.any('SELECT * FROM account', [true]).then(function(data) {
		console.log('data', data)
	})
	.catch(function(error) {
		console.log('error', error)
	})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))