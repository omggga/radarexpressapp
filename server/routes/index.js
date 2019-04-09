module.exports = function(app) {
	app.use('/', require('./start'))
	app.use('/get/:form', require('./form'))
	app.use('/user/:id', require('./user'))
	app.use('/save', require('./save'))
	app.use('/reset/:id', require('./reset'))
}