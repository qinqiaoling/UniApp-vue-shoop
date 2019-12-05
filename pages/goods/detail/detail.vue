<template>
	<view class="goodwrap">
		<good-basic :basicdata='gooddata.goodbasic' v-on:gofree="gofreeA"></good-basic>
		<specfic :specficdata='gooddata.specficlist' v-on:listenTochildEvent="listenTochildEventspecfic"></specfic>
		<comment :commentdata='gooddata.comment'></comment>
		<recommend :list='gooddata.recommendgood'></recommend>
		<introduce :list='gooddata.goodintroduced'></introduce>
		<goodimglist :list="gooddata.goodbasic.goodImgList"></goodimglist>
		<goodnotes :list="gooddata.notes.detail"></goodnotes>
		<good-action v-on:addcart="addcart" v-on:nowBuy="nowBuy"></good-action>
		<!-- 底部弹窗 -->
		<coupon :list="gooddata.discount" ref="coupup" v-show="hascoupup"></coupon>
	</view>
</template>

<script>
	import goodBasic from '@/components/goods/good-basic.vue'
	import goodAction from '@/components/goods/good-action.vue'
	import specfic from '@/components/goods/specfic.vue'
	import comment from '@/components/goods/comment.vue'
	import recommend from '@/components/goods/recommend.vue'
	import introduce from '@/components/goods/introduce.vue'
	import goodimglist from '@/components/goods/good-img-list.vue'
	import goodnotes from '@/components/goods/good-notes.vue'
	import coupon from '@/components/goods/good-coupon.vue'
	import mockData from '@/data/good.js'
	import mockData1 from '@/data/cart.js'
	export default {
		components: {
			goodBasic,
			goodAction,
			specfic,
			comment,
			recommend,
			introduce,
			goodimglist,
			goodnotes,
			coupon
		},
		data() {
			return {
				gooddata: {},
				goodobj:{},
				coupup:'',
				hascoupup:false,
			}
		},
		onLoad(option) {
			// console.log(mockData.data.goodbasic)
			let goodsdata = mockData.data
			if(option.text && option.src){
				goodsdata.goodbasic.goodName = option.text
				if(option.oldprice || option.newprice){
					goodsdata.goodbasic.goodPrice = option.newprice
					goodsdata.goodbasic.goodOldPrice = option.oldprice
				}else{
					goodsdata.goodbasic.goodPrice = 416
					goodsdata.goodbasic.goodOldPrice = 900
				}
				goodsdata.goodbasic.goodImgList.map((item,index)=>{
					item.url = option.src
				})
				this.gooddata = goodsdata
			}else{
				goodsdata.goodbasic.goodName = 'Sandro Moscoloni2018夏季新款显瘦直筒裙小个子V领针织连衣裙女'
				goodsdata.goodbasic.goodImgList.map((item,index)=>{
					item.url = '/static/goods/TO_DELETE/large1.jpg'
				})
				this.gooddata = goodsdata
			}
		},
		onBackPress(e) {
			// #ifdef APP-PLUS
			if(this.hascoupup === true){
				this.$refs.coupup.togglePopup('');
				return true;
			}
			// #endif
		},
		methods:{
			// 监听规格，尺寸，数量
			listenTochildEventspecfic(val){
				let newdate = new Date().getTime()
				this.goodobj = {
					goods_image: this.gooddata.goodbasic.goodImgList[0].url,
					goods_name: this.gooddata.goodbasic.goodName,
					goods_spec: val.measure+'码',
					goods_discount: this.gooddata.goodbasic.goodPrice === '免费' ?'0':this.gooddata.goodbasic.goodPrice,
					goods_price: this.gooddata.goodbasic.goodOldPrice,
					checked: false,
					number: val.number,
					id: String(newdate)
				}
				// console.log(val,this.goodobj)
			},
			// 加入购物车
			addcart(){
				if(uni.getStorageSync('hasLogin') === 'true'){
					uni.showToast({
						icon:'none',
						title:'成功加入购物车'
					})
					mockData1.cartList.push(this.goodobj)
				}else{
					uni.showToast({
						icon:'none',
						title:'请先登录才能使用购物车'
					})
				}
				// console.log(this.goodobj)
			},
			// 立即购买
			nowBuy(){
				if(uni.getStorageSync('hasLogin') === 'true'){
					let buyarray = [];
					let buyjson = {}
					buyjson = {
						state: 1,
						image: this.goodobj.goods_image,
						title: this.goodobj.goods_name,
						size: this.goodobj.goods_spec,
						amount: this.goodobj.number,
						money: this.goodobj.goods_discount,
					}
					buyarray.push(buyjson)
					this.$jump('/pages/order/ordersure?buy='+JSON.stringify(buyarray))
					// console.log(buyarray)
				}else{
					uni.showToast({
						icon:'none',
						title:'请先登录才能购买'
					})
				}
			},
			// 子组件传过来的事件，领取优惠券
			gofreeA(){
				this.hascoupup = true
				this.$refs.coupup.togglePopup('typecoupup');
				// console.log('点击领取')
			}
		}
	}
</script>

<style lang="scss">
	.goodwrap{
		padding-bottom: 100upx;
	}
</style>
