import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import App from './App.vue'
import routes from './routes'

import '../assets/app.styl'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuetify, {
	theme: {
		primary: '#01CAD1',
		secondary: '#2196f3',
		accent: '#4caf50',
		error: '#f44336'
	}
})

const router = new VueRouter({ routes })

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')