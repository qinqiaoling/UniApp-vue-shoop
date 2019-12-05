<template>
    <view class="content">
		<view class="wrapinput">
			<view class="input-group">
			    <view class="input-row border">
			        <text class="title">账号：</text>
			        <m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			    </view>
			    <view class="input-row">
			        <text class="title">密码：</text>
			        <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			    </view>
			</view>
		</view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="bindLogin">登录</button>
        </view>
        <view class="action-row">
			<text class="actiontext" @click="registeraccount">注册账号</text>
			<text>|</text>
			<text class="actiontext" @click="Sendmail">忘记密码</text>
        </view>
        <!-- <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
            <view class="oauth-image" v-for="provider in providerList" :key="provider.value">
                <image :src="provider.image" @tap="oauth(provider.value)"></image>
            </view>
        </view> -->
    </view>
</template>

<script>
    import service from '@/service.js';
    import {mapState,mapMutations} from 'vuex'
    import mInput from '@/components/logininput/m-input.vue'

    export default {
        components: {
            mInput
        },
        data() {
            return {
                providerList: [],
                hasProvider: false,
                account: '',
                password: '',
                positionTop: 0
            }
        },
        computed: mapState(['forcedLogin']),
		onBackPress(options) {
			// 监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack
			this.back();
			console.log('from:' + options.from)
			return true;  //加true才执行
		},
        methods: {
            ...mapMutations(['login']),
			back(){
				uni.reLaunch({
				    url: '/pages/tabs/index/index',
				});
			},
			// 注册
			registeraccount(){
				this.$jump('/pages/login/registeraccount')
			},
			// 忘记密码
			Sendmail(){
				this.$jump('/pages/login/Sendmail')
			},
            // initProvider() {
            //     const filters = ['weixin', 'qq', 'sinaweibo'];
            //     uni.getProvider({
            //         service: 'oauth',
            //         success: (res) => {
            //             if (res.provider && res.provider.length) {
            //                 for (let i = 0; i < res.provider.length; i++) {
            //                     if (~filters.indexOf(res.provider[i])) {
            //                         this.providerList.push({
            //                             value: res.provider[i],
            //                             image: '../../static/img/' + res.provider[i] + '.png'
            //                         });
            //                     }
            //                 }
            //                 this.hasProvider = true;
            //             }
            //         },
            //         fail: (err) => {
            //             console.error('获取服务供应商失败：' + JSON.stringify(err));
            //         }
            //     });
            // },
            // initPosition() {
            //     /*** 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。* 反向使用 top 进行定位，可以避免此问题。*/
            //     this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
            // },
            bindLogin() {
                /*** 客户端对账号信息进行一些必要的校验。实际开发中，根据业务需要进行处理，这里仅做示例。*/
                if (this.account.length < 5) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号最短为 5 个字符'
                    });
                    return;
                }
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
                /**
                 * 下面简单模拟下服务端的处理
                 * 检测用户账号密码是否在已注册的用户列表中
                 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
                 */
                const data = {
                    account: this.account,
                    password: this.password
                };
                const validUser = service.getUsers().some(function (user) {
                    return data.account === user.account && data.password === user.password;
                });
                if (validUser) {
                    this.toMain(this.account);
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '用户账号或密码不正确',
                    });
                }
            },
            // oauth(value) {
            //     uni.login({
            //         provider: value,
            //         success: (res) => {
            //             uni.getUserInfo({
            //                 provider: value,
            //                 success: (infoRes) => {
            //                     /**
            //                      * 实际开发中，获取用户信息后，需要将信息上报至服务端。
            //                      * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
            //                      */
            //                     this.toMain(infoRes.userInfo.nickName);
            //                 }
            //             });
            //         },
            //         fail: (err) => {
            //             console.error('授权登录失败：' + JSON.stringify(err));
            //         }
            //     });
            // },
            toMain(userName) {
                this.login(userName);
				uni.setStorage({
					key: 'hasLogin',
					data: 'true',
				})
                /**
                 * 强制登录时使用reLaunch方式跳转过来
                 * 返回首页也使用reLaunch方式
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '/pages/tabs/index/index',
                    });
                } else {
                    uni.navigateBack();
                }

            }
        },
        onReady() {
            // this.initPosition();
            // this.initProvider();
        }
    }
</script>

<style>
	.content{
		background: #eeeeee;
		height: calc(100vh - var(--window-top));
	}
	.wrapinput{
		padding: 60upx 20upx;
	}
	.input-group{
		border: 1upx solid #CCCCCC;
		background: #FFFFFF;
		padding: 10upx;
	}
	.input-row{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10upx;
	}
	.input-row.border{
		border-bottom: 1upx solid #CCCCCC;
	}
	.btn-row{
		padding: 20upx;
	}
    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .action-row navigator {
        color: #007aff;
        padding: 0 20upx;
    }
	.actiontext{
		color: #007aff;
		padding: 0 20upx;
		display: inline-block;
		vertical-align: middle;
	}
    .oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
    .oauth-image {
        width: 100upx;
        height: 100upx;
        border: 1upx solid #dddddd;
        border-radius: 100upx;
        margin: 0 40upx;
        background-color: #ffffff;
    }
    .oauth-image image {
        width: 60upx;
        height: 60upx;
        margin: 20upx;
    }
</style>
