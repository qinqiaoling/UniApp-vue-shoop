<template>
	<view class="goos_container">
		<view v-for="(item,index) in evalutelist" :key='index' class="goos_lists" v-if="item.state == 3">
			<view class="space_between align_items_center">
				<view class="time_clock flex_row ">
					<image class="clock_image" src="/static/order/clock.png"></image> 
					<text class="goods_time">2018-11-28 17:15:20 ----订单编号：{{item.id}}</text>
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
					<view class="money_amount  flex_column"> 
						<text class="goods_money">￥{{item.money}}</text> 
						<text class="goods_amount">X {{item.amount}}</text> 
					</view>
				</view>
			</view>
			<view class="separate_line"></view>
			<view class="bottom_amount_money"> 
				<text class="_amount">共1件商品</text> 
				<text class="need_pay" v-if="item.state == 1">需付款 ：</text> 
				<text class="need_pay" v-if="item.state == 3 || item.state == 4 || item.state == 2"> 实付款 ：</text>
				<text class="_money">￥{{item.money*item.amount}}</text> 
			</view>
			<view class="state_btn"> 
				<text class="_btn" @click="sure(item)">去评价</text> 
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name:'order-not-evaluate',
		props:{
			list:{
				type:Array,
				default:function(){
					return []
				}
			}
		},
		data(){
			return{
				evalutelist:[]
			}
		},
		created() {
			this.evalutelist = this.list
		},
		methods:{
			goToPage(item) {
				console.log(item)
			},
			sure(item){
				uni.showToast({
					icon:'none',
					title:'去评价'
				})
				// console.log(item)
			},
		}
		
	}
</script>

<style lang="scss">
	@import "../../static/order/order.css";
</style>

