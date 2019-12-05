<template>
    <view class="content">
		<view class="wrapinput">
			<view class="input-group">
			    <view class="input-row">
			        <text class="title">邮箱：</text>
			        <m-input type="text" focus clearable v-model="email" placeholder="请输入邮箱"></m-input>
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
                email: ''
            }
        },
        methods: {
            findPassword() {
                /**
                 * 仅做示例
                 */
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法',
                    });
                    return;
                }
                uni.showToast({
                    icon: 'none',
                    title: '已发送重置邮件至注册邮箱，请注意查收。',
                    duration: 3000
                });
				let query_USERS_KEY = JSON.parse(uni.getStorageSync('USERS_KEY'));//获取存储信息
				query_USERS_KEY[0].email = this.email
				uni.setStorage({
					key:'USERS_KEY',
					data:JSON.stringify(query_USERS_KEY)//存储的时候必须把对象转换成字符串，server.js获取的时候会转换成对象的
				})
				// 返回上一页
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
