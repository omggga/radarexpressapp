module.exports = {
	parserOptions: {
		ecmaVersion: 2017,
		parser: 'babel-eslint'
	},
	extends: [
		'plugin:vue/recommended',
		'standard'
	],
	plugins: [
		'vue'
	],
	"rules":{
		"indent": [2, "tab"],
		"no-tabs": 0,
		"eol-last": 0,
		"no-new": 0,
		"vue/html-indent": 0,
		"no-debugger": 0
	}
}