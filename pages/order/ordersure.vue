<template>
	<view class="order-sure">
		<!-- 地址 -->
		<adress></adress>
		<!-- 商品 -->
		<product :list="productlist" v-on:buymoney="buymoney"></product>
		<!-- 底部悬浮 -->
		<submitorder :count="count" v-on:submitfrom="submitfrom"></submitorder>
	</view>
</template>

<script>
	import adress from '@/components/order/ordersure/orderadress.vue'
	import product from '@/components/order/ordersure/orderpaoduct.vue'
	import submitorder from '@/components/order/ordersure/submitorder.vue'
	import mockData from '@/data/order.js'
	export default{
		components:{adress,product,submitorder},
		data(){
			return{
				productlist:[],
				count:0,
			}
		},
		onLoad(option) {
			this.productlist = JSON.parse(option.buy)
		},
		onShow() {
			console.log('onshow')
			// 全局监听事件
			uni.$emit('update',{msg:'页面更新'})
		},
		methods:{
			// 购买总价格
			buymoney(e){
				this.count = e
				// console.log(e)
			},
			// 提交订单
			submitfrom(e){
				this.productlist.map((item)=>{
					mockData.allTradeList.push(item)
				})
				this.$jump('/pages/order/order?index=1')
				// console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	.order-sure{
		position: relative;
		padding-bottom: 100upx;
	}
</style>
