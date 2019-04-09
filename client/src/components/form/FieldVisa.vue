<template lang="pug">
	v-flex.pt-2(xs12)
		v-layout.select_from(justify-center)
			v-select(ref="selectedVisas",
				v-model="selectedVisas",
				name="visa"
				:items="visa",
				label="А что с документами?",
				multiple,
				attach,
				color="#01CAD1",
				dense,
				:menu-props="{maxHeight: 185}")
				template(v-slot:prepend-item)
					v-list-tile(ripple, @click="toggleVisa")
						v-list-tile-action
							v-icon(:color="selectedVisas.length > 0 ? '#01CAD1' : ''") {{ iconVisa }}
						v-list-tile-content
							v-list-tile-title Мне все равно
				template(v-slot:selection="{ item, index }")
					span(v-if="index === 0") {{ item }}
					span(v-if="index === 1") &nbsp;, {{ item }}
					span(v-if="index === 2") &nbsp;(+{{ selectedVisas.length - 2 }})
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
		visa: [],
		selectedVisas: []
	}),

	computed: {
		allVisas () {
			return this.selectedVisas.length === this.visa.length
		},
		iconVisa () {
			if (this.allVisas) return 'done'
			return 'mdi-checkbox-blank-outline'
		}
	},

	async created () {
		const url = 'http://localhost:3000/get/visa'
		const selectData = await fetch(url)
		const result = await selectData.json()
		this.visa = result
		this.selectedVisas = this.userdata
	},

	methods: {
		toggleVisa () {
			this.$nextTick(() => {
				if (this.allVisas) {
					this.selectedVisas = []
				} else {
					this.selectedVisas = this.visa.slice()
					this.$refs.selectedVisas.blur()
				}
			})
		}
	}
}
</script>