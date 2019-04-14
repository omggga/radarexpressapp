<template lang="pug">
	v-flex(xs12, sm6, :class="{'pl-4': $vuetify.breakpoint.smAndUp, 'pl-0': $vuetify.breakpoint.xsOnly}")
		v-layout.select_from(justify-center)
			v-select(ref="selectedCountries",
				name="countries",
				v-model="selectedCountries",
				v-bind:items="countries",
				item-text="name",
				item-value="name",
				label="А куда?",
				multiple,
				attach,
				color="#01CAD1",
				dense,
				:menu-props="{maxHeight: 255}",
				:rules="[ selectedCountries.length > 0 || 'Как это никуда?!']",
				validate-on-blur, autocomplete)
				template(v-slot:prepend-item)
					v-list-tile(ripple, @click="toggleCountry")
						v-list-tile-action
							v-icon(:color="selectedCountries.length > 0 ? '#01CAD1' : ''") {{ iconCountry }}
						v-list-tile-content
							v-list-tile-title Куда угодно
				template(v-slot:selection="{ item, index }")
					span(v-if="index === 0", v-text="item.name")
					span(v-if="index === 1", v-text="item.name")
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
		const url = 'http://localhost:3000/get/countries'
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
		},
		limitTextCount (count) {
			return `и еще ${count}`
		}
	}
}
</script>