<template lang="pug">
	v-flex(xs12)
		v-layout(row, wrap, justify-center)
			v-flex.dates-comobobox(justify-center, xs12)
				v-combobox(slot="activator",
					v-model="months",
					name="date",
					multiple,
					disabled,
					hide-no-data,
					readonly,
					hide-selected,
					:rules="[ months.length > 0 || 'А когда?']")
				v-date-picker(ref="months",
					label="А когда?",
					v-model="months",
					name="months",
					type="month",
					multiple,
					color="#01CAD1",
					locale="ru",
					no-title,
					:min="minDate",
					:max="maxDate",
					full-width)
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
		months: []
	}),

	computed: {
		minDate () {
			return this.formatDate(new Date())
		},
		maxDate () {
			return this.formatDate(new Date(new Date().setFullYear(new Date().getFullYear() + 1)))
		}
	},

	async created () {
		let i = this.userdata.length
		while (i--) {
			if (new Date(this.userdata[i]) < new Date()) {
				this.userdata.splice(i, 1)
			}
		}
		this.months = this.userdata
	},

	methods: {
		formatDate (date) {
			const year = date.getFullYear()
			let month = date.getMonth() + 1
			if (month.length < 2) month = `0${month}`
			return [year, month].join('-')
		}
	}
}
</script>