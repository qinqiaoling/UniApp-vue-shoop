<template>
	<view class="goos_container">
		<view v-for="(item,index) in alllist" :key='index' class="goos_lists">
			<view class="space_between">
				<view class="time_clock flex_row">
					<image class="clock_image" src="/static/order/clock.png"></image> 
					<text class="goods_time">2018-11-28 17:15:20 ----订单编号：{{item.id}}</text>
				</view>
				<view class="_state  align_items_center">
					<text v-if="item.state == 1" class="goods_state">待付款</text>
					<text v-if="item.state == 2" class="goods_state">待收货</text>
					<text v-if="item.state == 3" class="goods_state">待评价</text>
					<text v-if="item.state == 4" class="goods_state">交易完成</text>
					<image v-if="item.state == 4" class="delete_image" src="/static/order/delete.png" @click="delectimg(item)"></image>
				</view>
			</view>
			<view @click="goToPage(item)" class="sigle_goos_list">
				<view class="image_contaner">
					<image class="goods_image" :src="item.image"></image>
				</view>
				<view class="goods_description flex_row">
					<view class="title_size flex_column">
						<text class="goods_title">{{item.title}}</text>
						<text class="goods_size">{{item.size}}</text>
					</view>
					<view class="money_amount flex_column">
						<text class="goods_money">￥{{item.money}}</text>
						<text class="goods_amount">X {{item.amount}}</text> 
					</view>
				</view>
			</view>
			<view class="bottom_amount_money">
				<text class="_amount">共1件商品</text>
				<text class="need_pay" v-if="item.state == 1">
					需付款 ：</text>
				<text class="need_pay" v-if="item.state == 3 || item.state == 4 || item.state == 2"> 实付款 ：</text>
				<text class="_money">￥{{item.money*item.amount}}</text>
			</view>
			<view class="state_btn">
				<text v-if="item.state == 1" class="_btn" @click="sure(item)">去支付</text>
				<text v-if="item.state == 4" class="_btn" @click="sure(item)">再次购买</text>
				<text v-if="item.state == 3" class="_btn" @click="sure(item)">去评价</text>
				<text v-if="item.state == 2" class="_btn" @click="sure(item)">确认收货</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name:'order-all',
		props:{
			list:{
				type:Array,
				default:function(){
					return []
				}
			},
			current:{
				default:0
			},
		},
		data(){
			return{
				alllist:[]
			}
		},
		created() {
			// this.alllist = this.list
			this.alllistfun(this.current,this.list)
		},
		methods:{
			goToPage(item) {
				console.log(item)
				let _this = this
				_this.$emit('goToPage',item)
			},
			// 交易完成可以删除按纽
			delectimg(item){
				let _this = this
				_this.$emit('delectimg',item)
			},
			sure(item){
				let _this = this
				if(item.state == 1){
					uni.showToast({
						icon:'none',
						title:'去支付'
					})
					_this.$emit('gopay',item)
				}else if(item.state == 2){
					uni.showToast({
						icon:'none',
						title:'确认收货'
					})
					_this.$emit('goreceive',item)
				}else if(item.state == 3){
					uni.showToast({
						icon:'none',
						title:'去评价'
					})
					_this.$emit('goevaluate',item)
				}else if(item.state == 4){
					uni.showToast({
						icon:'none',
						title:'再次购买'
					})
					_this.$emit('gorepay',item)
				}
			},
			// 封装alllist方法
			alllistfun(currentv,list){
				if(currentv == 0){
					this.alllist = list
				}else if(currentv == 1){
					this.alllist = []
					list.map((item,index)=>{
						if(item.state == 1){
							this.alllist.push(item)
						}
					})
				}else if(currentv == 2){
					this.alllist = []
					list.map((item,index)=>{
						if(item.state == 2){
							this.alllist.push(item)
						}
					})
				}else if(currentv == 3){
					this.alllist = []
					list.map((item,index)=>{
						if(item.state == 3){
							this.alllist.push(item)
						}
					})
				}else if(currentv == 4){
					this.alllist = []
					list.map((item,index)=>{
						if(item.state == 4){
							this.alllist.push(item)
						}
					})
				}
				console.log(list)
			},
		},
		watch:{
			current:{
				handler(newdata,olddata){
					let _this = this
					_this.current = newdata
					// _this.alllist = _this.list
					_this.alllistfun(_this.current,_this.list)
					// console.log(newdata,olddata,_this.current,_this.list,_this.alllist)
				},
				deep:true
			}
		}
	}
</script>
<style lang="scss">
	@import "../../static/order/order.css";
</style>
