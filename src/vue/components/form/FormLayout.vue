<template lang="pug">
	v-form(id="radarform", ref="form", v-model="valid", action="", method="post", lazy-validation=true)
		v-layout.pl-4.pr-4(row, wrap, justify-center)
			field-from(:userdata="userFrom", ref="selectedCities")
			field-to(:userdata="userTo", ref="selectedCountries")
			field-dates(:userdata="userMonths", ref="months")
			field-visa(:userdata="userVisa", ref="selectedVisas")
			field-price(:userdata="userprice", ref="slider")
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
			this.userFrom = JSON.parse(result[0].from)
			this.userTo = JSON.parse(result[0].to)
			this.userMonths = JSON.parse(result[0].dates)
			this.userVisa = JSON.parse(result[0].visa)
			this.userprice = +result[0].pricelimit
		}
	},

	methods: {
		validate () {
			if (this.$refs.form.validate()) {
				const data = {
					userkey: this.$route.params.id,
					from: this.$refs.selectedCities.selectedCities,
					to: this.$refs.selectedCountries.selectedCountries,
					dates: this.$refs.months.months,
					visa: this.$refs.selectedVisas.selectedVisas,
					price: this.$refs.slider.slider
				}

				if (!data.userkey) {
					console.log('No user key specified!')
					return
				}

				fetch('http://localhost:3000/save', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				}).then((data) => {
					this.$router.push('/complete')
				}).catch(() => {
					this.$router.push('/error')
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