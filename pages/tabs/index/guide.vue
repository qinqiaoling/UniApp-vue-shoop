<template>
	<view>
		<!-- 引导页 -->
		<apppageguide :img_list="img_list"></apppageguide>
	</view>
</template>

<script>
	import apppageguide from "@/components/common/app-page-guide/app-page-guide.vue"
	export default {
		components: {
			apppageguide
		},
		data() {
			return {
				img_list:['/static/app-page-guide/guide1.jpg','/static/app-page-guide/guide2.jpg','/static/app-page-guide/guide3.jpg'],
			}
		},
		onLoad() {
			
		},
		methods:{
		}
	}
</script>

<style>
</style>
