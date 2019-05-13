<template lang="pug">
	v-layout.pt-1.pb-1(wrap, justify-start)
		v-flex(xs1)
			img(src="static/images/cropped-trlogo_002.png", alt="Travel Radar", width="67", height="68")
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