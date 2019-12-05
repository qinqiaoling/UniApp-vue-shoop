<template>
	<view class="mycardbag">
		<view v-if="cardinfo.type === 'money' || cardinfo.type === 'integral'">
			<cardbag :cardinfo="cardinfo"></cardbag>
		</view>
		<view v-if="cardinfo.type === 'discount'">
			<carddiscount :discountinfo="discountinfo"></carddiscount>
		</view>	
	</view>
</template>

<script>
	import cardbag from '@/components/mine/cardbag.vue' //积分和零钱
	import carddiscount from '@/components/mine/card-discount.vue' //优惠券
	import mockData from '@/data/mine.js'
	export default {
		components: {cardbag,carddiscount},
		data() {
			return {
				cardinfo:{},
				discountinfo:[],
			}
		},
		onLoad(option) {
			this.cardinfo={
				type:option.type,
				number:option.num
			}
			if(option.type === 'discount'){
				this.discountinfo = mockData.discount
			}
		},
		methods: {
			
		},
		watch:{
			
		}
	}
</script>

<style lang="scss">
	.mycardbag{}
</style>
