<template>
	<view class="content">
		<!-- 入口页 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad(){
			this.loadExecution()
		},
		methods: {
			loadExecution: function(){
				/**
				 * 获取本地存储中launchFlag的值
				 * 若存在，说明不是首次启动，直接进入首页；
				 * 若不存在，说明是首次启动，进入引导页；
				 */
				try {
				    const value = uni.getStorageSync('launchFlag');
				    if (value) {
				        if (value == true) {
				            uni.switchTab({
				                url: '/pages/tabs/index/index'
				            });
				        } else {
				            uni.redirectTo({
				                url: '/pages/tabs/index/guide'
				            });
				        }
				    } else {
				        uni.setStorage({
				            key: 'launchFlag',
				            data: true,
				            success: function() {
								console.log('存储launchFlag');
							}
				        });
				        uni.redirectTo({
				            url: '/pages/tabs/index/guide'
				        });
				    }
				} catch(e) { 
					// error 
					uni.setStorage({ 
						key: 'launchFlag', 
						data: true, 
						success: function () {
							console.log('error时存储launchFlag');
						} 
					}); 
					uni.redirectTo({ url: '/pages/tabs/index/guide' }); 
				}
				return;
				uni.switchTab({
				    url: '/pages/tabs/index/index'
				});
			}
		}
	}
</script>

<style>
	
</style>
