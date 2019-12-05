<template>
	<view class="center_container">
		<uni-list>
			<uni-list-item title="用户名" @click="goAccount"></uni-list-item>
			<uni-list-item title="头像" @click="goHeadImg"></uni-list-item>
			<uni-list-item title="密码" @click="goPassword"></uni-list-item>
			<uni-list-item title="手机号" @click="goIphone"></uni-list-item>
			<uni-list-item title="邮箱" @click="goMail"></uni-list-item>
		</uni-list>
		<uni-list>
			<uni-list-item title="退出" @click="loginout"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from '@/components/mine/uni-list.vue'
	import uniListItem from '@/components/mine/uni-list-item.vue'	
	export default {
		components:{uniList,uniListItem},
		data() {
			return {
			};
		},
		methods:{
			// 修改用户名
			goAccount(){
				this.$jump('/pages/setting/ResAccount');
			},
			// 设置头像
			goHeadImg(){
				this.$jump('/pages/setting/Resheadimg');
			},
			// 修改密码
			goPassword(){
				this.$jump('/pages/setting/ResPassword');
			},
			// 设置手机号
			goIphone(){
				this.$jump('/pages/setting/ResIphone');
			},
			// 修改邮箱
			goMail(){
				this.$jump('/pages/setting/ResMail');
			},
			// 退出登录
			loginout(){
				let _this = this;
				uni.showModal({
				    title: '提示',
				    content: '此操作将退出登录，是否继续？',
				    success: function (res) {
				        if (res.confirm) {
				            uni.showToast({
				            	icon:'none',
								title:"已退出登录"
				            });
							// 退出登录不是注销账号，只是啊改变登录状态，输入上次账号密码还是可以登录的
							uni.setStorageSync('hasLogin', 'false');
							_this.$jump('/pages/login/login');
				        } else if (res.cancel) {
				            uni.showToast({
				                title: '取消退出',
				                icon:'none'
				            });
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	
</style>
