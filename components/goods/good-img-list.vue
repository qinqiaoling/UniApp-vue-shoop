<template>
	<view class="goodimglist">
		<view class="malldetail-imgdetail-title">{{goodtitle}}</view>
		<view class="goodImgList">
			<image v-for="(item,index) in list" :key='index' class="malldetail-imgdetail-img" :src="item.url" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default{
		name:'goodimglist',
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
				goodtitle:'图文详情'
			}
		}
	}
</script>

<style lang="scss">
	.goodimglist{
		border-bottom: 16upx solid #f2f2f2;
		padding: 24upx 32upx;
		.malldetail-imgdetail-title {
			padding-bottom: 24upx;
			font-size: 32upx;
			color: #1a1a1a;
		}
		.goodImgList{
			text-align: center;
			.malldetail-imgdetail-img{
				width: 100%;
			}
		}
	}
</style>
