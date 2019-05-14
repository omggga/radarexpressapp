<template lang="pug">
	v-flex(xs12, sm6, :class="{'pl-4': $vuetify.breakpoint.smAndUp, 'pl-0': $vuetify.breakpoint.xsOnly}")
		v-layout.select_from(justify-center)
			v-autocomplete(ref="selectedCountries",
				name="countries",
				v-model="selectedCountries",
				v-bind:items="countries",
				item-text="name",
				item-value="name",
				label="А куда?",
				multiple,
				color="#01CAD1",
				dense,
				:menu-props="{maxHeight: 255}",
				:rules="[ selectedCountries.length > 0 || 'Как это никуда?!']",
				validate-on-blur,
				no-data-text="Ничего не найдено",
				:filter="filterData",
				placeholder="Пиши тут или выбирай")
				template(v-slot:prepend-item)
					v-list-tile(dense, @click="toggleCountry")
						v-list-tile-action
							v-icon(:color="selectedCountries.length > 0 ? '#01CAD1' : ''") {{ iconCountry }}
						v-list-tile-content
							v-list-tile-title Куда угодно
				template(slot="selection" slot-scope="{ item, index }", v-ripple="{ color: '#01CAD1' }")
					span(v-if="index === 0") {{ item.name }}
					span(v-if="index === 1") ,&nbsp;{{ item.name }}
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
			return this.selectedCountries.length === (this.countries.length - 7)
		},
		iconCountry () {
			if (this.allCountries) return 'done'
			return 'mdi-checkbox-blank-outline'
		}
	},

	async created () {
		const url = '/get/countries'
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
					this.$refs.selectedCountries.blur()
				} else {
					this.selectedCountries = this.countries.filter((country) => {
						return country.hasOwnProperty('name')
					})
					this.$refs.selectedCountries.blur()
				}
			})
		},

		filterData (item, queryText, itemText) {
			queryText = queryText.toString().trim()
			itemText = itemText.toString()
			return itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
		}
	}
}
</script>