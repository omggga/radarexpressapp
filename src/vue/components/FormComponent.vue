<template lang="pug">
	v-layout.pt-1.pb-1(wrap, justify-start)
		v-flex(xs1)
			img(src="static/images/logo.jpg", alt="Travel Radar", width="70", height="70")
		v-flex.pt-4(xs11)
			span.headline.pl-2 Лети отсюда!
		v-flex(xs12)
			form-layout
</template>

<script>
import FormLayout from './form/FormLayout.vue'
export default {
	components: {
		FormLayout
	}
}
</script>