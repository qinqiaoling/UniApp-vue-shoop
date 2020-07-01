import Vue from 'vue'

Vue.mixin({
	methods: {
		tableNameRender(h, {
			row,
			col
		}) {
			console.log(row)
			return h('view', row.name)
		}
	}
})
