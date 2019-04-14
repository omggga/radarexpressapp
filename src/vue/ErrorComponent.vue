<template lang="pug">
	v-layout.pt-1.pb-1(wrap, justify-start)
		v-flex(xs1)
			img(src="static/images/logo.jpg", alt="Travel Radar", width="70", height="70")
		v-flex.pt-4(xs11)
			span.headline.pl-2 Упс!
		v-flex.pt-4.pb-4(xs12)
			p Произошла непредвиденная ошибка!
			p Попробуй пожалуйста чуть позже...
</template>