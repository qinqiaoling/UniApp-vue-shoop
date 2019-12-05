<template>
	<view class="container">
		<view v-if="hasLogin == true||hasLogin == 'true'">
			<empty v-if='cartList.length===0'></empty>
			<cart-item ref='cart' v-else :cartList="cartList"></cart-item>
		</view>
		<view v-else>
			<empty v-if='cartList.length===0'></empty>
		</view>
	</view>
</template>

<script>
	import empty from '@/components/cart/empty.vue'
	import cartItem from '@/components/cart/cart-item.vue'
	import mockData from '@/data/cart.js'
	export default {
		components: {
			empty,
			cartItem
		},
		data() {
			return {
				cartList:[],
				hasLogin:uni.getStorageSync('hasLogin'), //判断是否登录
			};
		},
		onLoad() {
			// this.hasLoginFun(this.hasLogin);
		},
		onShow(){
			this.hasLogin = uni.getStorageSync('hasLogin')
			this.hasLoginFun(this.hasLogin);
			console.log(this.hasLogin)
		},
		methods: {
			// 判断是否登录
			hasLoginFun(hasl){
				if(hasl === true || hasl === 'true'){
					this.cartList = mockData.cartList;
				}else{
					// uni.reLaunch({
					//     url: '/pages/login/login'
					// });//relaunch关闭所有页面跳转应用内某个页面，左上角返回按钮也没有了。
					this.$jump('/pages/login/login')
				}
				console.log(hasl)
			},
		},
		watch:{
			$route(to,from) {
				if(to.path === '/pages/tabs/cart/cart'){
					// 当页面是购物车页面时，再次获取登录状况，判断是否登录，有的用户可能登录后又退出了，退出了就不再访问购物车页面
					this.hasLogin = uni.getStorageSync('hasLogin')
					this.hasLoginFun(this.hasLogin);
				}
				console.log('to:',to,'from:',from)
			},
			hasLogin(oval,nval){
				// oval 最新的值，nval 上一次的值
				this.hasLogin = oval
				console.log(oval,nval);
			}
		}
	}
</script>

<style lang='scss'>
	.container {
		padding-bottom: 134upx;

	}
</style>
