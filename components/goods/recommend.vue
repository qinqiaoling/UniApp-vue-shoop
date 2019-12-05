<template>
	<view class="recommend-content"> <text class="recommend-title">相似推荐</text>
		<view class="recommend-outer">
			<view v-for="(item,index) in list" :key="index" class="recommend-box" @click="detail(item)">
				<image class="recommend-img" :src="item.icon"></image>
				<text class="recommend-good-name">{{item.title}}</text>
				<view> 
					<text class="recommend-price">{{item.price}}</text>
					<text class="recommend-oldPrice">{{item.oldPrice}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'recommend',
		props: {
			list: {
				type:Array,
				default:function(){
					return []
				}
			}
		},
		methods: {
			detail(item) {
				// console.log(item)
				this.$jump('/pages/goods/detail/detail?text='+item.title+'&src='+item.icon)
			}
		}
	}
</script>

<style>
	.recommend-content {
		display: flex;
		flex-direction: column;
		padding: 0 0 40upx 32upx;
		border-bottom: 16upx solid #F2F2F2;
	}

	.recommend-title {
		margin: 24upx 0upx;
		font-size: 32upx;
		color: #1a1a1a;
	}
	.recommend-outer{
		display: flex;
	}

	.recommend-box {
		display: flex;
		flex-direction: column;
		width: 216upx;
		margin: 0upx 16upx 0upx 0upx;
	}

	.recommend-img {
		height: 216upx;
		width: 216upx;
		border-radius: 8upx;
	}

	.recommend-good-name {
		margin: 14upx 0upx 4upx 0upx;
		font-size: 24upx;
		color: #1a1a1a;
		height: 68upx;
		overflow: hidden;
	}

	.recommend-price {
		font-size: 24upx;
		color: #fa2a2d;
		margin-right: 10upx;
	}

	.recommend-oldPrice {
		color: #8d8d8d;
		font-size: 24upx;
		text-decoration: line-through;
	}
</style>
