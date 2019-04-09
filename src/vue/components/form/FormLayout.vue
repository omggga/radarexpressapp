<template lang="pug">
	v-form(id="radarform", ref="form", v-model="valid", action="", method="post")
		v-layout.pl-4.pr-4(row, wrap, justify-center)
			field-from(:userdata="userFrom")
			field-to(:userdata="userTo")
			field-dates(:userdata="userMonths")
			field-visa(:userdata="userVisa")
			field-price(:userdata="userprice")
			v-flex.pt-2(xs12)
				div.pb-3
					v-btn(color="success", @click="validate") Сохранить
					v-btn(color="info", @click="reset") Очистить форму
</template>

<script>
import FieldFrom from './FieldFrom.vue'
import FieldTo from './FieldTo.vue'
import FieldDates from './FieldDates.vue'
import FieldVisa from './FieldVisa.vue'
import FieldPrice from './FieldPrice.vue'
export default {
	components: {
		FieldFrom,
		FieldTo,
		FieldDates,
		FieldVisa,
		FieldPrice
	},

	data: () => ({
		valid: false,
		userFrom: [],
		userTo: [],
		userMonths: [],
		userVisa: [],
		userprice: 99000
	}),

	async created () {
		const url = 'http://localhost:3000/user/' + this.$route.params.id
		const selectData = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
		const result = await selectData.json()
		if (result && result.length > 0) {
			this.userFrom = JSON.parse(result[0].place_from)
			this.userTo = JSON.parse(result[0].place_to)
			this.userMonths = JSON.parse(result[0].dates)
			this.userVisa = JSON.parse(result[0].visa)
			this.userprice = +result[0].pricelimit
		}
	},

	methods: {
		validate () {
			if (this.$refs.form.validate()) {
				const data = {
					key: this.$route.params.id || undefined,
					from: this.$refs.selectedCities.value,
					to: this.$refs.selectedCountries.value,
					dates: this.$refs.months.value,
					visa: this.$refs.selectedVisas.value,
					price: this.$refs.slider.value
				}

				fetch('http://localhost:3000/save', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				}).then((data) => {
					this.$router.push('CompleteComponent')
				})
			}
		},
		reset () {
			this.$refs.form.reset()
			this.slider = 99000
		}
	}
}
</script>