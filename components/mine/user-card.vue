<template>
	<view>
		<view v-if="has_Login == true||has_Login == 'true'">
			<view class="user-card">
				<view class="usercard-top">
					<view class="avatar">
						<!-- 如果刚登录还没修改过头像将使用默认头像，否则就是用修改过的头像 -->
						<image :src="userinfo.avatar === undefined?'/static/mine/mzyun.jpg':userinfo.avatar" @error="imageError(userinfo.avatar)"></image>
						<view class="name"> 
							<text>{{userinfo.account}}</text> 
						</view>
					</view>
				</view>
				<block v-if="expand.length>0">
					<view class="usercard-bottom">
						<block v-for="(item,index) in expand" :key='index'>
							<block v-if="index>0">
								<view class="line"></view>
							</block>
							<view class="usercard-bottom-item" @click="gocardbag(item,index)">
								<view class="item-top"> 
									<text>{{item.number}}</text> 
								</view>
								<view class="item-bottom"> 
									<text>{{item.name}}</text> 
								</view>
							</view>
						</block>
					</view>
				</block>
			</view>
		</view>
		<view v-else>
			<view class="user-card">
				<view class="usercard-top">
					<view class="avatar">
						<image src="/static/mine/mzyun.jpg"></image>
						<view class="name">
							<view class="dispflex">
								<text>未登录</text>
								<text class="go_login" @click="gologin">去登录</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "user-card",
		props: {
			userinfo: {},
			expand:{
				type:Array,
				default:function(){
					return[]
				}
			},
			hasLogin:{
				type:[Boolean,String],
				default:false
			}
		},
		data() {
			return {
			}
		},
		computed:{
			has_Login(){
				return this.hasLogin
			},
		},
		methods: {
			// 跳到登录页面事件
			gologin(){
				this.$jump('/pages/login/login')
			},
			// 进入卡包
			gocardbag(item,index){
				// console.log(item,index)
				this.$jump('/pages/tabs/mine/minecardbag?type='+item.type+'&num='+item.number)
			},
			// 当头像加载失败时使用默认图片
			imageError(src){
				// console.log(src)
				this.userinfo.avatar = '/static/mine/mzyun.png'
			}
		},
		watch:{
			
		}
	}
</script>

<style lang="scss">
	.user-card {
		margin: 5% 5%;
		width: 90%;
		display: flex;
		flex-direction: column;
		height: 320upx;
		border-radius: 15upx;
		background: linear-gradient(45deg,#FFFF00,#F0AD4E);
	}
	.usercard-top {
		width: 100%;
	}
	.avatar {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		align-content: center;
		margin-top: 50upx;
	}
	.avatar-noexpand {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		text-align: right;
	}
	.avatar image {
		border-radius: 70upx;
		width: 100upx;
		height: 100upx;
		margin: 0upx 32upx 0upx 50upx;
	}
	.avatar-noexpand image {
		border-radius: 70upx;
		width: 100upx;
		height: 100upx;
	}
	.name{
		flex: 1;
	}
	.name .dispflex{
		display: flex;
		justify-content:space-between;
		align-items: center;
	}
	.name .dispflex text {
		font-size: 30upx;
		color: #5B441A;
	}
	.go_login{
		margin-right: 40upx;
		height: 56upx;
		line-height: 56upx;
		width: 160upx;
		border-radius: 8upx;
		background: #F8F8F8;
		text-align: center;
	}
	.usercard-bottom {
		width: 100%;
		height: 160upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.usercard-bottom-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
	}
	.item-top text {
		font-size: 31upx;
		text-align: center;
		color: #5B441A
	}
	.item-bottom text {
		font-size: 25upx;
		text-align: center;
		color: #5B441A
	}
	.line {
		height: 50upx;
		width: 3upx;
		margin: 0 20upx;
		background-color: rgba(0, 0, 0, 0.2);
	}
</style>
