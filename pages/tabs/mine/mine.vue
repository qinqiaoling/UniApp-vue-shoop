<template>
	<view>
		<view v-if="hasLogin == true||hasLogin == 'true'">
			<!-- 已登录 -->
			<user-card :userinfo='userinfo' :expand="expand" :hasLogin="true"></user-card>
			<grid :nav='nav'></grid>
			<uni-list>
				<uni-list-item title="地址管理" @click='goAddress'></uni-list-item>
				<uni-list-item title="消息" @click='information'></uni-list-item>
				<uni-list-item title="设置" @click='goSetting'></uni-list-item>
				<uni-list-item title="关于" @click='goAbout'></uni-list-item>
			</uni-list>
		</view>
		<view v-else>
			<!-- 未登录 -->
			<user-card :userinfo='userinfo' :expand="expand" :hasLogin="false"></user-card>
		</view>
	</view>
</template>

<script>
	import userCard from '@/components/mine/user-card.vue'
	import grid from '@/components/common/grid.vue'
	import uniList from '@/components/mine/uni-list.vue'
	import uniListItem from '@/components/mine/uni-list-item.vue'
	import mockData from '@/data/mine.js'
	export default {
		components: {userCard,grid,uniList,uniListItem},
		data() {
			return {
				userinfo: {},
				expand: [],
				nav: [],
				hasLogin:uni.getStorageSync('hasLogin'), //判断是否登录
			}
		},
		onLoad() {
			// 第一次加载会触发，tabbar 切换就不会触发了
			this.hasLoginFun(this.hasLogin)
			// console.log(this.userinfo)
		},
		onShow(){
			// onLoad()第一次加载完后，tabbar 切换就触发onShow()
			this.hasLogin = uni.getStorageSync('hasLogin')
			this.hasLoginFun(this.hasLogin);
			console.log(this.hasLogin)
		},
		onTabItemTap(e){
			// 当点击当前tabbar时会被监听到这个事件，并且触发这个事件
			console.log('点击tabbar触发：',e)
		},
		methods: {
			// 判断是否登录
			hasLoginFun(hasLogin){
				if(hasLogin === true || hasLogin === 'true'){
					this.hasLogin = true
					this.userinfo = JSON.parse(uni.getStorageSync('USERS_KEY'))[0];
					this.expand = mockData.walletInfo;
					this.nav = mockData.nav
				}else{
					this.hasLogin = false
				}
			},
			// 地址管理
			goAddress() {
				this.$jump('/pages/address/address-list/address-list')
			},
			// 消息
			information(){
				this.$jump('/pages/information/information')
			},
			// 设置
			goSetting() {
				this.$jump('/pages/setting/setting')
			},
			// 关于
			goAbout() {
				this.$jump('/pages/about/about')
			}
		},
		watch:{
			// h5 页面可以监听到，app现在监听不到了
			$route(to,from) {
				if(to.path === '/pages/tabs/mine/mine'){
					// 当页面是我的页面时，再次获取登录状况，判断是否登录，有的用户可能登录后又退出了，退出了就展示未登录状态
					this.hasLogin = uni.getStorageSync('hasLogin')
					this.hasLoginFun(this.hasLogin)
				}
				console.log('to:',to,'from:',from)
			},
			hasLogin(oval,nval){
				this.hasLogin = oval
				console.log(oval,nval);
			}
		}
	}
</script>

<style>

</style>
