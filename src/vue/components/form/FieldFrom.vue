<template lang="pug">
	v-flex(xs12, sm6)
		v-layout.select_from(justify-center)
			v-select(ref="selectedCities",
				v-model="selectedCities",
				:items="cities",
				label="Откуда отсюда?",
				multiple,
				attach,
				color="#01CAD1",
				dense,
				:menu-props="{maxHeight: 185}",
				:rules="[ selectedCities.length > 0 || 'Ну так откуда?']",
				validate-on-blur)
				template(v-slot:prepend-item)
					v-list-tile(dense, @click="toggleCity")
						v-list-tile-action
							v-icon(:color="selectedCities.length > 0 ? '#01CAD1' : ''") {{ iconCity }}
						v-list-tile-content
							v-list-tile-title Везде
				template(v-slot:selection="{ item, index }", v-ripple="{ color: '#01CAD1' }")
					span(v-if="index === 0") {{ item }}
					span(v-if="index === 1") &nbsp;, {{ item }}
					span(v-if="index === 2") &nbsp;(+{{ selectedCities.length - 2 }})
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
		cities: [],
		selectedCities: []
	}),

	computed: {
		allCities () {
			return this.selectedCities.length === this.cities.length
		},
		iconCity () {
			if (this.allCities) return 'done'
			return 'mdi-checkbox-blank-outline'
		}
	},

	async created () {
		const url = 'http://localhost:3000/get/countries'
		const selectData = await fetch(url)
		const result = await selectData.json()
		this.cities = result
		setTimeout(() => {
			this.selectedCities = this.userdata
		}, 300)
	},

	methods: {
		toggleCity () {
			this.$nextTick(() => {
				if (this.allCities) {
					this.selectedCities = []
				} else {
					this.selectedCities = this.cities.slice()
					this.$refs.selectedCities.blur()
				}
			})
		}
	}
}
</script>