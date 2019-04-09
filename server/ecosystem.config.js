module.exports = {
	apps : [{
		name: 'radarprice',
		script: 'index.js',
		instances: 1,
		autorestart: true,
		watch: true,
		max_memory_restart: '1G',
		env: {
			NODE_ENV: 'production',
			PORT: 4000,
			PG_CONNECT: 'postgres://front:priX1Fuewl5iT7Op1E@193.176.79.194:5432/radar3?ssl=true'
		}
	}]
}
