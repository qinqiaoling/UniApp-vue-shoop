<template>
	<view class="goodintroduced-content"> 
		<text class="goodintroduced-title">{{goodtitle}}</text>
		<view v-for="(item,index) in list" :key='index'>
			<text class="goodintroduced-name">{{item.title}}</text>
			<text class="goodintroduced-value">{{item.value}}</text>
		</view>
	</view>
</template>
<script>
	export default{
		name:'introduce',
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
				goodtitle:'商品介绍'
			}
		}
	}
</script>
<style>
	.goodintroduced-content {
		display: flex;
		flex-direction: column;
		border-bottom: 16upx solid #F2F2F2;
		padding: 24upx 32upx 24upx 32upx;
	}
	.goodintroduced-title {
		margin: 0upx 0upx 26.4upx 0upx;
		font-size: 31.3upx;
		color: #1a1a1a;
	}
	.goodintroduced-name {
		width: 108.9upx;
		margin: 0upx 33.3upx 33.3upx 0upx;
		font-size: 27.1upx;
		color: #1a1a1a;
	}
	.goodintroduced-value {
		margin: 0upx 0upx 33.3upx 0upx;
		font-size: 27.1upx;
		color: #1a1a1a;
	}
</style>

