const express = require('express')
const app = express()
const port = 3000

const pgp = require('pg-promise')
const pgsql = 'postgres://qvduspzt:nqQSJHteBSE1_APAMeQHFP6h7FhuGipl@balarama.db.elephantsql.com:5432/qvduspzt'
const db = pgp(pgsql)

app.get('/', (req, res) =>  {

	try {
		const users = yield db.any('CREATE TABLE users (user_id bigserial primary key, user_key varchar(20) NOT NULL, from text NOT NULL, to text NOT NULL, visa text default NULL, dates text NOT NULL, price text NOT NULL, date_added timestamp default NULL);', [true])
	} catch(e) {
		console.log(e)
	}

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))