<template>
    <view class="content">
		<view class="wrapinput">
			<view class="input-group">
			    <view class="input-row">
			        <text class="title">密码：</text>
			        <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			    </view>
			</view>
		</view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="findPassword">提交</button>
        </view>
    </view>
</template>

<script>
    import service from '@/service.js';
    import mInput from '@/components/logininput/m-input.vue';

    export default {
        components: {
            mInput
        },
        data() {
            return {
                password: ''
            }
        },
        methods: {
            findPassword() {
                /**
                 * 仅做示例
                 */
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
                uni.showToast({
                    icon: 'none',
                    title: '密码重置成功,请重新登录。',
                    duration: 3000
                });
				let query_USERS_KEY = JSON.parse(uni.getStorageSync('USERS_KEY'));//获取存储信息
				query_USERS_KEY[0].password = this.password
				uni.setStorage({
					key:'USERS_KEY',
					data:JSON.stringify(query_USERS_KEY)//存储的时候必须把对象转换成字符串，server.js获取的时候会转换成对象的
				})
				// 修改密码成功后把密码存到本地，返回上一页
				uni.navigateBack({
					delta:1
				})
            }
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
		justify-content: center;
		padding: 10upx;
	}
	.input-row.border{
		border-bottom: 1upx solid #CCCCCC;
	}
	.btn-row{
		padding: 20upx;
	}
</style>
