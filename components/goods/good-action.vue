<template>
	<view class="malldetail-buy">
		<image class="malldetail-shopcart-img" @click="goCart" src="/static/goods/shopcart.png"></image>
		<image class="malldetail-star-img" :src="hasCollect === true ? '/static/goods/star-success.png' :'/static/goods/star.png'" @click="collection(hasCollect)"></image>
		<!-- <image v-else class="malldetail-star-img" src="/static/goods/star-success.png" @click="collection('false')"></image> -->
		<text class="malldetail-shopcart-add" @click="addCart">加入购物车</text> 
		<text class="malldetail-now-buy" @click="nowBuy">立即购买</text>
	</view>
</template>

<script>
	export default {
		name: 'good-action',
		props: {
			isCollect: {
				type: Boolean,
				default: false
			}
		},
		data(){
			return{
				hasCollect:false,
			}
		},
		onLoad() {
			this.hasCollect = this.isCollect
		},
		methods: {
			// 跳购物车页面
			goCart(){
				uni.switchTab({
					url:'/pages/tabs/cart/cart'
				});
			},
			// 收藏
			collection(isc) {
				if(isc === true){
					this.hasCollect = false
					uni.showToast({
						icon:'none',
						title:'取消收藏'
					})
				}else{
					this.hasCollect = true
					uni.showToast({
						icon:'none',
						title:'已收藏'
					})
				}
			},
			// 加入购物车
			addCart() {
				this.$emit('addcart')
			},
			// 立即购买
			nowBuy() {
				this.$emit('nowBuy')
			}
		}
	}
</script>

<style>
	.malldetail-buy {
		position: fixed;
		bottom: 0upx;
		left: 0upx;
		right: 0upx;
		border-color: #cccccc;
		background-color: #ffffff;
		border-top-width: 0.5upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.malldetail-shopcart-img {
		width: 50upx;
		height: 50upx;
		margin: 0upx 50upx 0upx 33upx;
	}

	.malldetail-star-img {
		width: 50upx;
		height: 50upx;
		margin: 0upx 33.3upx 0upx 0upx;
	}

	.malldetail-shopcart-add {
		padding: 25upx 56upx;
		background-color: #ffb700;
		font-size: 31.3upx;
		color: #ffffff;
	}

	.malldetail-now-buy {
		padding: 25upx 68upx;
		background-color: #ff7500;
		font-size: 31.3upx;
		color: #ffffff;
	}
</style>
