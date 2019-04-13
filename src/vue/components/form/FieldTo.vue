<template lang="pug">
	v-flex(xs12, sm6, :class="{'pl-4': $vuetify.breakpoint.smAndUp, 'pl-0': $vuetify.breakpoint.xsOnly}")
		v-layout.select_from(justify-center)
			v-select(ref="selectedCountries",
				name="countries",
				v-model="selectedCountries",
				:items="countries",
				label="А куда?",
				multiple,
				attach,
				color="#01CAD1",
				dense,
				:menu-props="{maxHeight: 185}",
				:rules="[ selectedCountries.length > 0 || 'Как это никуда?!']",
				validate-on-blur)
				template(v-slot:prepend-item)
					v-list-tile(ripple, @click="toggleCountry")
						v-list-tile-action
							v-icon(:color="selectedCountries.length > 0 ? '#01CAD1' : ''") {{ iconCountry }}
						v-list-tile-content
							v-list-tile-title Куда угодно
				template(v-slot:selection="{ item, index }")
					span(v-if="index === 0") {{ item }}
					span(v-if="index === 1") &nbsp;, {{ item }}
					span(v-if="index === 2") &nbsp;(+{{ selectedCountries.length - 2 }})
</template>

<script>
export default {
	props: {
		userdata: {
			validator: value => typeof value === 'object',
			default: () => []
		}
	},

	data: () => ({
		countries: [],
		selectedCountries: []
	}),

	computed: {
		allCountries () {
			return this.selectedCountries.length === this.countries.length
		},
		iconCountry () {
			if (this.allCountries) return 'done'
			return 'mdi-checkbox-blank-outline'
		}
	},

	async created () {
		const url = 'http://localhost:3000/get/countriesto'
		const selectData = await fetch(url)
		const result = await selectData.json()
		this.countries = result
		setTimeout(() => {
			this.selectedCountries = this.userdata
		}, 300)
	},

	methods: {
		toggleCountry () {
			this.$nextTick(() => {
				if (this.allCountries) {
					this.selectedCountries = []
				} else {
					this.selectedCountries = this.countries.slice()
					this.$refs.selectedCountries.blur()
				}
			})
		}
	}
}
</script>