<template>
	<view class="c_mask">		
	<!-- :style="`width:${swiper_width}rpx;transform:translateX(${pre_x +trans_x}px);${!dont_ani ? 'transition:'+trans_time+'s' : ''}`" -->
		<view 		
			v-bind:style="{
				width: (screen_width * img_list.length) + 'px',
				transform: 'translateX(' + (pre_x + trans_x) + 'px)',
				transition: !dont_ani ? trans_time + 's' : 'none'
			}"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
			@click="swiperClick"
			class="c_swiper">
			<view
			v-for="(item,index) in img_list"
			:key="index"
			class="c_swiper_item" v-bind:style="{width:screen_width + 'px'}">
				<image class="introduce_img" v-bind:style="{width:screen_width + 'px'}" :src="item" mode="aspectFill"></image>
			</view>
		</view>
		<view class="new_go" v-if="is_last_page_but" v-bind:style="{width:screen_width + 'px'}">
			<button class="go_button" @click="goindex">立即体验</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			img_list: {
				type: Array,
				default: () => {
					return [];
				}
			},
			trans_time: {
				type: Number,
				default: .2
			}
		},
		data () {
			return {
				// swiper_width: this.img_list.length * 750,
				screen_width: 0,
				// 当前是哪一页
				now_page: 1,
				touch_start: {},
				trans_x: 0,
				pre_x: 0,
				// 是否是最后一张图还要往右边滑
				is_last_page: false,
				is_last_page_but: false,//是否最后一张图显示按钮
				// 不播放动画
				dont_ani: false,
				// 是否可以移动
				can_move: true
			}
		},
		mounted () {			
			// 获取屏幕宽度
			uni.getSystemInfo({
				success: res => {
					this.screen_width = res.windowWidth;
					// console.log(res,res.screenWidth)
				}
			})
		},
		methods: {
			goindex(){
				uni.switchTab({
				    url: '/pages/tabs/index/index'
				});
			},
			swiperClick () {				
				this.$emit('swiperClick',this.now_page);
			},
			touchStart (e) {
				if (!this.can_move) {
					return false;
				}
				this.touch_start = e.mp.touches[0];
				this.dont_ani = true;
			},
			touchMove (e) {
				if (!this.can_move) {
					return false;
				}
				let {clientX} = e.mp.touches[0];
				if (this.now_page == 1 && clientX - this.touch_start.clientX > 0) {
					return false;
				} else if (this.now_page == this.img_list.length && clientX - this.touch_start.clientX < 0) {
					this.is_last_page = true;
					return false;
				}
				// console.log(this.now_page,this.img_list.length-1)
				this.is_last_page = false;
				this.is_last_page_but = false;
				this.trans_x = parseInt(clientX - this.touch_start.clientX);
			},
			touchEnd (e) {
				if (this.can_move) {
					this.can_move = false;
					setTimeout(() => {
						this.can_move = true;
					}, this.trans_time*1000)					
				}else{
					return false;
				}
				if (this.is_last_page) {
					this.$emit('lastPage',this.is_last_page);	
					this.is_last_page_but = true;
					this.trans_x = 0;
					return false;
				}
				if (Math.abs(this.trans_x) > this.screen_width / 4) {
					if (this.trans_x > 0) {
						this.pre_x += this.screen_width;
						this.now_page--;
					} else {
						this.pre_x -= this.screen_width;
						this.now_page++;
						if(this.now_page == this.img_list.length){
							this.is_last_page_but = true;
						}
						// console.log(this.now_page)
					}
				}else {
					this.trans_x = 0;
				}
				this.trans_x = 0;
				this.dont_ani = false;
			}
		}
	}
</script>

<style lang="scss">
	.c_mask{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: fixed;
		top: 0;
		z-index: 1000;
	}
	.c_swiper{	
		width: 100%;
		height: 100vh;
		.c_swiper_item{
			// width: 750upx;
			height: 100%;
			float: left;
		}
	}
	.introduce_img{
		position: absolute;
		// width: 750upx;
		height: 100%;
	}
	.new_go{
		position: fixed;
		left: 0;
		bottom: 200upx;
		.go_button{
			height: 80upx;
			line-height: 80upx;
			border-radius: 40upx;
			width: 400upx;
		}
	}
</style>
