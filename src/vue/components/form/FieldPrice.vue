<template lang="pug">
	v-flex.pt-2(xs12)
		v-layout(row, wrap)
			v-flex.xs9
				v-slider(ref="slider",
					v-model="slider",
					name="price",
					color="#01CAD1",
					always-dirty,
					height="5",
					label="₽₽₽",
					min="0",
					max="99000",
					step="1000",
					type="number",
					:rules="[ slider > 0 || 'Ну хотя бы примерную цену']",
					thumb-label,
					thumb-size="38")
			v-flex.xs3.pl-3.txt-for-price
				v-text-field.slider-element-text(ref="sliderNum", v-model="slider", type="text", readonly)
</template>

<script>
export default {
	props: {
		userdata: {
			validator: value => typeof value === 'number',
			default: () => 99000
		}
	},

	data: () => ({
		slider: 99000
	}),

	watch: {
		slider: function (value) {
			if (isNaN(value)) {
				this.slider = 99000
				this.sliderNum = 99000
			}
		}
	},

	async created () {
		this.slider = this.userdata
		this.sliderNum = this.userdata
	}
}
</script>