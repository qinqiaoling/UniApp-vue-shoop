<template>
	<view>
		<block>
			<!-- 轮播图 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for='(item,index) in bannerList' :key='index'>
					<image class="swiper-image" :src="item.uri" @click="gomeetplace(item)"></image>
				</swiper-item>
			</swiper>
			<!-- 第一个item-container 新人专区时尚女装-->
			<item-container :num='itemcontainer1.noswipernum2' :banner='itemcontainer1.banner' :list='itemcontainer1.data1'></item-container>
			<!-- 第二个item-container  最in频道-->
			<item-container :num='itemcontainer2.noswipernum3' :banner='itemcontainer2.banner' :list='itemcontainer2.data1'></item-container>
			<!-- 第三个item-container 折扣专区-->
			<item-container :num='itemcontainer3.noswipernum4' :banner='itemcontainer3.banner' :list='itemcontainer3.data1'></item-container>
			<!-- 第一个list-mall 全球热卖下的碗杯瓶-->
			<list-mall :num='listmall1.mallnum2' :banner='listmall1.mallbanner' :list='listmall1.malldata'></list-mall>
			<!-- 第二个list-mall  大牌精选-->
			<list-mall :num='listmall2.mallnum3' :banner='listmall2.mallbanner' :list='listmall2.malldata'></list-mall>
			<!-- 第三个list-mall  全球热卖-->
			<list-mall :num='listmall3.mallnum1' :banner='listmall3.mallbanner' :list='listmall3.malldata'></list-mall>
			<!-- 第四个list-mall 大牌精选下的包包-->
			<list-mall :num='listmall4.mallnum4' :banner='listmall4.mallbanner' :list='listmall4.malldata'></list-mall>
			<!-- 第一个sola  新特卖-->
			<sola :banner='sola.solabanner' :list="sola.solalist"></sola>
		</block>
	</view>
</template>

<script>
	import itemContainer from '@/components/index/item-container.vue'
	import listMall from '@/components/index/list-mall.vue'
	import sola from '@/components/index/sola.vue'
	import mockData from '@/data/index.js'
	import mockindex from '@/mock/index/index.js'
	export default {
		components: {
			itemContainer,
			listMall,
			sola
		},
		data() {
			return {
				bannerList:[],
				itemcontainer1:{},
				itemcontainer2:{},
				itemcontainer3:{},
				listmall1:{},
				listmall2:{},
				listmall3:{},
				listmall4:{},
				sola:{},
			}
		},
		onLoad() {
			this.bannerList=mockData.bannerList;
			this.itemcontainer1=mockData.itemcontainer1;
			this.itemcontainer2=mockData.itemcontainer2;
			this.itemcontainer3=mockData.itemcontainer3;
			this.listmall1=mockData.listmall1;
			this.listmall2=mockData.listmall2;
			this.listmall3=mockData.listmall3;
			this.listmall4=mockData.listmall4;
			this.sola=mockData.sola
			// 
			// this.querydata()
		},
		methods:{
			gomeetplace(val){
				this.$jump('/pages/tabs/index/meetingplace?id='+val.id)
			},
			// querydata(){
			// 	request请求与mock模拟数据互通
			// 	uni.request({
			// 		url:'/api/load',
			// 		method:'GET',
			// 		success: (res) => {
			// 			console.log(res)
			// 		}
			// 	})
			// },
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 400upx;
		.swiper-image {
			height: 400upx;
			width: 690upx;
			margin: 0 30upx;
			border-radius: 15upx;
		}
	}
</style>
