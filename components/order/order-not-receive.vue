<template>
	<view class="goos_container">
		<view v-for="(item,index) in receivelist" :key="index" class="goos_lists" v-if="item.state == 2">
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
			<view class="bottom_amount_money"> 
				<text class="_amount">共1件商品</text> 
				<text class="need_pay" v-if="item.state == 1">需付款 ：</text> 
				<text class="need_pay" v-if="item.state == 3 || item.state == 4 || item.state == 2"> 实付款 ：</text>
				<text class="_money">￥{{item.money*item.amount}}</text> 
			</view>
			<view class="state_btn"> 
				<text class="_btn" @click="sure(item,index)">确认收货</text> 
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name:'order-not-receive',
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
				receivelist:[]
			}
		},
		created() {
			this.receivelist = this.list
		},
		methods:{
			goToPage(item) {
				console.log('商品详情',item)
			},
			sure(item,index){
				console.log(item)
				uni.showToast({
					icon:'none',
					title:'已收货'
				})
				this.receivelist.map((ite,inx)=>{
					if(item.id == ite.id){
						ite.state = 4
						this.receivelist.splice(inx,1,ite)
					}
				})
			},
		}
	}
</script>
<style lang="scss">
	@import "../../static/order/order.css";
</style>

