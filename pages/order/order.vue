<template>
	<view>
		<uni-segmented-control :current="current" :values="tabArray" @clickItem="tabClick" styleType="text" activeColor='#d81e06'></uni-segmented-control>
		<view class="content">
			<!-- <view v-show="current === 0"> -->
				<order-all :list='allTradeList' :current="current" @goToPage="goToPage" @delectimg="delectimg" @gopay="gopay" @goreceive="goreceive" @goevaluate="goevaluate" @gorepay="gorepay" ref="allfun"></order-all>
			<!-- </view> -->
			<!-- <view v-show="current === 1">
				<order-not-pay :list='allTradeList'></order-not-pay>
			</view>
			<view v-show="current === 2">
				<order-not-receive :list='allTradeList'></order-not-receive>
			</view>
			<view v-show="current === 3">
				<order-not-evaluate :list='allTradeList'></order-not-evaluate>
			</view>
			<view v-show="current === 4">
				<order-done :list='allTradeList'></order-done>
			</view> -->
		</view>
		<!-- poup -->
		<couponone ref="coupup" v-show="hascoupup" @reparent="reparentlist"></couponone>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/order/uni-segmented-control.vue'
	import orderAll from '@/components/order/order-all.vue'
	// import orderNotPay from '@/components/order/order-not-pay.vue'
	// import orderNotReceive from '@/components/order/order-not-receive.vue'
	// import orderNotEvaluate from '@/components/order/order-not-evaluate.vue'
	// import orderDone from '@/components/order/order-done.vue'
	import couponone from '@/components/order/gopay-coupon-one.vue'
	import mockData from '@/data/order.js'

	export default {
		components: {
			uniSegmentedControl,
			orderAll,
			// orderNotPay,
			// orderNotReceive,
			// orderNotEvaluate,
			// orderDone,
			couponone
		},
		data() {
			return {
				current: 0,
				tabArray: ['全部', '待收款', '待收货', '待评价', '已完成'],
				allTradeList: [],
				hascoupup:false,
			};
		},
		onLoad(options) {
			this.current = Number(options.index)?Number(options.index):this.current;
			this.allTradeList = mockData.allTradeList
		},
		methods: {
			// tab 订单切换
			tabClick(index) {
				let _this = this
				if (_this.current != index) {
					_this.current = index
					// console.log(_this.current)
				}
			},
			// 每一个订单详情
			goToPage(val){
				console.log(val)
				this.$jump('/pages/order/orderinfo?info='+JSON.stringify(val))
			},
			// 订单完成删除订单按钮
			delectimg(val){
				let _this = this
				_this.changelist(val,1)
			},
			// 去支付
			gopay(val){
				let _this = this
				_this.hascoupup = true
				_this.$refs.coupup.togglePopup('typecoupup');
				_this.$refs.coupup.init(val);
			},
			// 确认收货
			goreceive(val){
				let _this = this
				_this.changelist(val,0)
			},
			// 去评价
			goevaluate(val){
				let _this = this
				_this.$jump('/pages/evaluate/evaluate?evalu='+JSON.stringify(val))
			},
			// 再次购买
			gorepay(val){
				let _this = this
				let timestamp = new Date().getTime().toString().substr(5,10)
				let additem = {
					amount: val.amount,
					id: timestamp,
					image: val.image,
					money: val.money,
					size: val.size,
					state: 1,
					title: val.title
				}
				_this.allTradeList.push(additem)
				_this.$refs.allfun.alllistfun(_this.current,_this.allTradeList)
			},
			// 输完密码
			reparentlist(val){
				console.log(val)
				let _this = this
				_this.changelist(val,0)
			},
			// 封装订单数组是删除还是更改订单状态：val是数据，statev是判断是删除还是改状态,0是更改，1是删除
			changelist(val,statev){
				let _this = this
				_this.allTradeList.map((ite,inx)=>{
					if(val.id == ite.id){
						if(statev == 0){
							// 更改
							if(val.state == 1){
								// 去支付-->待收货
								ite.state = 2
								_this.allTradeList.splice(inx,1,ite)
								_this.$refs.allfun.alllistfun(_this.current,_this.allTradeList)
							}else if(val.state == 2){
								// 待收货-->已完成
								ite.state = 4
								_this.$refs.allfun.alllistfun(_this.current,_this.allTradeList)
								_this.allTradeList.splice(inx,1,ite)
							}
						}else if(statev == 1){
							// 删除
							_this.allTradeList.splice(inx,1)
						}
					}
				})
			},
			
		},
	}
</script>

<style lang="scss">

</style>
