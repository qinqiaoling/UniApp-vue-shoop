<template>
	<view class="orderproduct">
		<view class="goos_container">
			<view v-for="(item,index) in list" :key="index" class="goos_lists">
				<view class="space_between align_items_center">
					<view class="time_clock flex_row ">
						<image class="clock_image" src="/static/order/clock.png"></image> 
						<text class="goods_time">2019-11-28 17:15:20</text>
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
				<view v-show="index !== list.length-1" class="separate"></view>
			</view>
		</view>
		<view v-if="false">{{count}}</view>
	</view>
</template>

<script>
	export default{
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
			}
		},
		computed:{
			count:function() {
				let num = 0;
				this.list.map((item)=>{
					num += item.money*item.amount
				})
				return num.toFixed(2)
			}
		},
		mounted() {
			this.$emit('buymoney',this.count)
		},
		methods:{
			goToPage(item){
				this.$jump('/pages/goods/detail/detail?text='+item.title+'&src='+item.image)
				// console.log(item)
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../static/order/order.css";
	.orderproduct{
		.goos_container{
			padding-top: 0;
		}
		.goods_title{
			margin-bottom: 0;
			height: 80upx;
			line-height: 40upx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.goods_size{
			padding-top: 20upx;
		}
		.bottom_amount_money{
			margin-top: 0;
			padding: 30upx 0;
		}
	}
</style>
