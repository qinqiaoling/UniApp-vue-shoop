<template>
	<view class="cardbag">
		<view v-if="cardinfo.type === 'money'">
			<view class="sihnwrap"><view class="sign">￥</view></view>
			<view class="cardtext">我的零钱</view>
			<view class="cardmoney"><text>￥</text>{{cardinfo.number}}</view>
		</view>
		<view v-if="cardinfo.type === 'integral'">
			<view class="sihnwrap"><view class="sign">￥</view></view>
			<view class="cardtext">我的积分</view>
			<view class="cardmoney">{{cardinfo.number}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: "card-bag",
		props: {
			cardinfo: {},
		},
		data() {
			return {
			}
		},
		onLoad() {
			
		},
		methods: {
			
		},
	}
</script>

<style lang="scss">
	.cardbag{
		text-align: center;
		padding-top: 30upx;
		font-size: 32upx;
		font-weight: bold;
	}
	.sihnwrap{
		display: flex;
		justify-content: center;
	}
	.sign{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		background: gold;
		color: #fff;
		font-size: 50upx;
		font-weight: bold;
		text-align: center;
		line-height: 100upx;
	}
	.cardtext{
		padding: 20upx 0;
	}
	.cardmoney{
		font-size: 40upx;
		text{
			margin-right: 10upx;
		}
	}
</style>
