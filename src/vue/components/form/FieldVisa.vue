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
				:menu-props="{maxHeight: 185}",
				validate-on-blur)
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
			default: () => ['Без визы', 'Есть шенген', 'Есть виза США']
		}
	},

	data: () => ({
		visa: ['Без визы', 'Есть шенген', 'Есть виза США'],
		selectedVisas: ['Без визы', 'Есть шенген', 'Есть виза США']
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
		setTimeout(() => {
			this.selectedVisas = this.userdata
		}, 300)
	},

	methods: {
		toggleVisa () {
			this.$nextTick(() => {
				if (this.allVisas) {
					this.selectedVisas = []
					this.$refs.selectedVisas.blur()
				} else {
					this.selectedVisas = this.visa.slice()
					this.$refs.selectedVisas.blur()
				}
			})
		}
	}
}
</script>