<template lang="pug">
	v-layout.pt-1.pb-1(wrap, justify-start)
		v-flex(xs1)
			img(style="background-color: #01cad1;", src="static/images/logoTG_VK_white_700.png", alt="Travel Radar", width="85", height="85")
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