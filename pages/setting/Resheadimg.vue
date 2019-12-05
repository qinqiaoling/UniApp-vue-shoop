<template>
    <view class="content">
		<view class="wrapinput">
			<view class="changeimg">
				<button @click="changeimg" type="primary" size="mini">选择照片</button>
			</view>
			<view class="ishowimg" v-if="imgsrc === '' ? false : true">
				<image :src="imgsrc" mode="aspectFit" class="imgstyle" @click="pereimg"></image>
				<view class="closeimg" @click="close">x</view>
			</view>
			<view class="noimg" v-else></view>
		</view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="findAccount">提交</button>
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
                imgsrc: '',
				perelist:[],//预览图片链接
            }
        },
        methods: {
			// 选择图片
			changeimg(){
				let _this = this;
				uni.chooseImage({
				    count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						console.log(res)
						_this.imgsrc = res.tempFilePaths[0]
						_this.perelist = res.tempFilePaths
				    }
				});
			},
			// 预览图片
			pereimg(){
				uni.previewImage({
					urls: this.perelist,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			// 移除头像
			close(){
				this.imgsrc = ''
				uni.showToast({
				    icon: 'none',
				    title: '成功移除头像',
				});
			},
            findAccount() {
                /*** 仅做示例*/
				if(this.imgsrc === ''){
					uni.showToast({
					    icon: 'none',
					    title: '选择照片不能为空',
					});
					return
				}
                uni.showToast({
                    icon: 'none',
                    title: '头像重置成功,请重新登录。',
                    duration: 3000
                });
				let query_USERS_KEY = JSON.parse(uni.getStorageSync('USERS_KEY'));//获取存储信息
				query_USERS_KEY[0].avatar = this.imgsrc
				uni.setStorage({
					key:'USERS_KEY',
					data:JSON.stringify(query_USERS_KEY)//存储的时候必须把对象转换成字符串，server.js获取的时候会转换成对象的
				})
				// 重置密码成功后把密码存到本地，返回上一页面
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
	.changeimg{
		padding-bottom: 20upx;
	}
	.ishowimg{
		width: 180upx;
		height: 180upx;
		border: 2upx dashed #999999;
		position: relative;
		box-sizing: content-box;
	}
	.closeimg{
		position: absolute;
		right: -12upx;
		top: -12upx;
		z-index: 1;
		width: 30upx;
		height: 30upx;
		border-radius: 50%;
		line-height: 20upx;
		text-align: center;
		color: #FFFFFF;
		background: #FA2A2D;
		font-size: 24upx;
	}
	.imgstyle{
		width: 180upx;
		height: 180upx;
	}
	.noimg{
		width: 180upx;
		height: 180upx;
		border: 2upx dashed #999999;
		position: relative;
		box-sizing: border-box;
	}
	.noimg:after{
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		content: "+";
		font-size: 60upx;
		color: #999999;
		width: 100%;
		text-align: center;
		height: 180upx;
		line-height: 180upx;
	}
	.btn-row{
		padding: 20upx;
	}
</style>
