<template>
	<view class="malldetail-flex-hh">
		<!-- 首页滑动banner -->
		<view class="malldetail-flex-h">
			<swiper autoplay="true" class="swiper" :indicator="true">
				<swiper-item v-for="(item,index) in basicdata.goodImgList" :key='index'>
					<image class="image" :src="item.url"></image>
				</swiper-item>
			</swiper>
		</view>
		<view> 
			<text class="malldetail-price" v-if="basicdata.goodPrice === '免费'">{{basicdata.goodPrice}}</text>
			<text class="malldetail-price" v-else v-show="basicdata.goodPrice?true:false">￥{{basicdata.goodPrice}}</text> 
			<text class="malldetail-oldPrice" v-show="basicdata.goodOldPrice === 'undefined' || basicdata.goodOldPrice ===undefined ? false : true">单买价￥{{basicdata.goodOldPrice}}</text>
		</view> 
		<view class="malldetail-good-name">{{basicdata.goodName}}</view>
		<view class="malldetail-free">
			<text class="malldetail-free-title">优惠券</text>
			<text class="malldetail-free-detail">{{basicdata.goodFree}}</text>
			<text class="malldetail-free-btn" @click="GoFree()">领取</text>
			<image class="malldetail-free-img" src="/static/arrow.png" @click="GoFree()"></image>
		</view> 
		<view class="malldetail-free-tips">{{basicdata.goodFreeDetail}}</view>
	</view>
</template>

<script>
	export default {
		name: 'good-basic',
		props: {
			basicdata: {},
		},
		data(){
			return{
			}
		},
		created(){
		},
		methods:{
			GoFree(){
				this.$emit('gofree')
			}
		}
	}
</script>

<style lang="scss">
	.malldetail-flex-hh{
		border-bottom: 16upx solid #f2f2f2;
	}
	.malldetail-flex-h {
		display: flex;
		flex-direction: column;
	}
	.swiper {
		width: 750upx;
		height: 750upx;
		display: flex;
		flex-direction: column;
		indicator-selected-color: rgba(255, 255, 255, 1);
		indicator-color: rgba(255, 255, 255, 0.5);
		indicator-size: 12upx;
	}
	.image {
		width: 750upx;
		height: 750upx;
	}
	.malldetail-price {
		margin: 33upx 10upx 0upx 33upx;
		color: #fa2a2d;
		font-size: 37upx;
	}
	.malldetail-oldPrice {
		margin: 45upx 0upx 0upx 0upx;
		color: #808080;
		text-decoration: line-through;
		font-size: 20upx;
	}
	.malldetail-good-name {
		margin: 16upx 32upx 20upx 32upx;
		color: #1a1a1a;
		font-size: 36upx;
	}
	.malldetail-free {
		display: flex;
		padding: 28upx 32upx;
		align-items: center;
		border-top: 16upx solid #f2f2f2;
	}
	.malldetail-free-title {
		padding: 0upx 10upx;
		margin: 0upx 16upx 0upx 0upx;
		color: #ff7500;
		border-radius: 4upx;
		border: 1upx solid #ff7500;
		font-size: 20upx;
	}
	.malldetail-free-detail {
		flex: 1;
		color: #1a1a1a;
		font-size: 31upx;
	}
	.malldetail-free-btn {
		padding: 0upx 9upx 0upx 0upx;
		font-size: 27upx;
		color: #808080;
	}
	.malldetail-free-img {
		width: 16upx;
		height: 28upx;
	}
	.malldetail-free-tips {
		margin: 0upx 32upx 20upx 32upx;
		font-size: 30upx;
		color: #1a1a1a;
	}
</style>
