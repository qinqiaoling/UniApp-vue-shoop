<template>
	<view class="countwrap">
		<view class="countflex">合计：<text>￥</text><text class="addcolor">{{count}}</text></view>
		<view class="countbutton" @click="submit"><button>提交订单</button></view>
	</view>
</template>

<script>
	export default{
		props:{
			count:'',
		},
		data(){
			return{
				
			}
		},
		methods:{
			submit(){
				this.$emit('submitfrom',this.count)
			}
		}
	}
</script>

<style lang="scss">
	.countwrap{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 2upx solid #f2f2f2;
		box-sizing: border-box;
		background: #ffffff;
		.countflex{
			flex: 1;
			text-align: right;
			font-size: 28upx;
			text{
				color: #ff7500;
				font-size: 24upx;
				&.addcolor{
					font-size: 32upx;
					padding-right: 20upx;
				}
			}
		}
		.countbutton{
			background: -moz-linear-gradient(top,  #ff7500 0%, #ffb700 100%);
			background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ff7500), color-stop(100%,#ffb700));
			background: linear-gradient(to left,  #ff7500 0%,#ffb700 100%);
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff7500', endColorstr='#ffb700',GradientType=1 );
			width: 200upx;
			button{
				font-size: 28upx;
				background: none;
				color: #ffffff;
				height: 100upx;
				line-height: 100upx;
				width: 100%;
			}
		}
	}
</style>
