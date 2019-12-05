<template>
	<view class="good-notes">
		<view class="malldetail-imgdetail-title">{{goodtitle}}</view>
		<view class="notes">
			<view class="malldetail-flex-h" v-for="(item,index) in list" :key='index'>
				<view class="malldetail-return-title">{{item.title}}</view>
				<view class="malldetail-return-detail">{{item.detail}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'goodnotes',
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
				goodtitle:'咨询与售后'
			}
		}
	}
</script>

<style lang="scss">
	.good-notes{
		border-bottom: 16upx solid #f2f2f2;
		padding: 24upx 32upx;
		.malldetail-imgdetail-title {
			padding-bottom: 24upx;
			font-size: 32upx;
			color: #1a1a1a;
		}
		.notes{
			.malldetail-return-title {
				padding-bottom: 24upx;
				font-size: 32upx;
				color: #1a1a1a;
			}
			.malldetail-return-detail {
				padding-bottom: 24upx;
				color: #808080;
				font-size: 28upx;
			}
		}
	}
</style>
