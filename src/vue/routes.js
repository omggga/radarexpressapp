import FormComponent from './components/FormComponent.vue'
import CompleteComponent from './CompleteComponent.vue'
import ErrorComponent from './ErrorComponent.vue'

const routes = [
	{ path: '/subscribe/:id', component: FormComponent },
	{ path: '/complete', component: CompleteComponent },
	{ path: '/error', component: ErrorComponent }
]

export default routes