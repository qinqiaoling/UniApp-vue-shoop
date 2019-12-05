<template>
	<view class="aboutshoop">
		<view class="quest" v-for="(item,index) in question" :key="index">
			<view class="questtitle">
				<view class="titletext">{{index + 1}}</view>
				<view class="titleq">，{{item.title}}</view>
			</view>
			<view class="qusetext" v-for="(itm,inx) in item.text" :key="inx">
				<text class="textp">{{index + 1}}-{{inx + 1}}</text>：{{itm.txt}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				question:[
					{
						title:"关于登录问题",
						text:[
							{
								txt:"账户密码设置长度需满足6个字符串长度，邮箱设置需满足邮箱正则规则就可以。本商城无后台请求，不会涉及到用户的账户密码以及隐私泄露。"
							}
						]
					},
					{
						title:"关于商城问题",
						text:[
							{
								txt:"本商城是在MzShop(1.0)模板基础上进行改写的。"
							}
						]
					},
					{
						title:"关于功能描述",
						text:[
							{
								txt:"登录功能。初次进入商城还没登录的情况下，在“购物车”和“我的”页面会检验是否登录，没有登录就跳入登陆页面，否则正常显示。在没有注册的情况下是不会有账号密码的记录，需要先注册后在返回登录页面进行登录并在本地存入账号密码。"
							},
							{
								txt:"首页页面。主要有轮播和商品的排版及展示，每一个版块都可以跳入meetingplace页面，根据传参id判断显示哪一个版块，以及悬浮头部nav滚动的距离高亮哪一个navlist。"
							},
							{
								txt:"分类页面。采用左边种类右边商品的布局。"
							},
							{
								txt:"商品详情页面。每一个商品都可以跳入商品详情页面并且展示商品价格、商品图片、商品名称，优惠券、规格、尺寸、购买数量、评论、相关推荐、商品介绍以及商品说明。优惠券领取采用弹窗形式展示。最底部有：收藏、加入购物车、立即购买。选好尺寸，规格和数量就可以加入购物车啦！也可以直接点立即购买将跳入确认订单页面。"
							},
							{
								txt:"购物车页面。登录后可查看购物车页面，功能涉及选购商品数量和价格对应的总价。点击“结算”按钮会跳入“确认订单”页面，展示刚选定的商品，数量，价格，默认收货人。点击收货人可以跳到收货人列表修改默认收货人。“提交订单”将进入订单页面。"
							},
							{
								txt:"我的页面。没登录只展示默认头像和没登录状态以及去登录按钮。初次登录后展示默认头像，用户名以及功能列表：优惠券、积分、零钱、订单、地址、消息、设置、关于。设置功能：修改用户信息包括：用户名、头像、密码、邮箱、手机号，并设有退出按钮。退出按钮只退出当前状态并不注销当前用户，下次只输入用户名和密码即可登录。订单涉及：全部订单、待付款订单、待收货订单、待评价订单、已完成订单。"
							},
							{
								txt:"订单页面。分为全部订单、待付款、待收货、待评价、已完成。订单通过数据state分类。去支付仿照淘宝里付款形式做的，付款方式，模拟键盘输入6位支付密码，输入成功后改变订单状态会在待收货订单里。确认收货后改变订单状态会在已完成订单里。在待评价订单里点击每一项去评价，会跳转到评价页面。点击商品图片和标题会跳转到订单详情页面。"
							}
						]
					}
				]
			}
		},
		onShow() {
			// 获取设备信息
			const res = uni.getSystemInfoSync();
			console.log(res)
		},
		onPullDownRefresh() {
			// 下拉刷新
			console.log('refresh');
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style lang="scss">
	$line-gradient:linear-gradient(to left, red, orange, yellow, green, blue, indigo, violet);
	$radial-gradient:repeating-radial-gradient(circle,red 0, red 10px, orange 10px, orange 20px, blue 20px, blue 30px);
	$slowspeed:5s;
	$fastspeed:2s;
	.aboutshoop{
		padding: 20upx;
		.quest{
			.questtitle{
				font-size: 36upx;
				padding-bottom: 10upx;
				display: flex;
				align-items: center;
				background-image:$line-gradient;
				color: transparent;
				-webkit-background-clip: text;
				background-size: 200% 100%;
				-webkit-animation: slide $slowspeed linear infinite alternate;
				animation: slide $slowspeed linear infinite alternate;
				.titletext{
					font-weight:bold;
					background-image:$line-gradient;
					color: transparent;
					-webkit-background-clip: text;
					background-size: 200% 100%;
					animation:blow $fastspeed infinite alternate ease-in-out;
					-webkit-animation:blow $fastspeed infinite alternate ease-in-out;
				}
				.titleq{
					
				}
			}
			.qusetext{
				font-size: 30upx;
				padding-bottom: 10upx;
				padding-left: 20upx;
				text-indent: 2em;
				background-image:$line-gradient;
				color: transparent;
				-webkit-background-clip: text;
				background-size: 200% 100%;
				-webkit-animation: slide $slowspeed linear infinite;
				animation: slide $slowspeed linear infinite;
				.textp{
					font-weight:bold;
				}
				.textplice{
				}
			}
		}
	}
	@keyframes slide {
		0%  {
			background-position: 0 0;
		}
		100% {
			background-position: -100% 0;
		}
	}
	@keyframes blow{
		0%  {
			transform: scale(1) skew(20deg,10deg); 
			opacity: 1;
		}
		50% {
			transform: scale(1.1) skew(-20deg,-10deg); 
			opacity: 0.8;
		}
		100% {
			transform: scale(1) skew(20deg,10deg); 
			opacity: 1;
		}
	}
</style>
