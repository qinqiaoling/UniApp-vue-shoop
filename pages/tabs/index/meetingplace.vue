<template>
	<view class="meetingplace">
		<!-- nav -->
		<view class="meetwrap">
			<scroll-view 
				class="scroll-view_H" 
				:scroll-x="true" 
				:scroll-left="scrollleft" 
				>
				<view class="meetdispflex">
					<view class="meetflex" v-for="(item,index) in listtitle" :key="index" :class="index == num ? 'on':''" @click="changelist(item,index)">
						{{item.title}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 对应的商品 -->
		<view class="meetgoodwrap">
			<view v-if="num == 0">
				<meetpl :metplist="metplist"></meetpl>
			</view>
			<view v-if="num == 1">
				<meetpl :metplist="metplist"></meetpl>
			</view>
			<view v-if="num == 2">
				<meetpl :metplist="metplist"></meetpl>
			</view>
			<view v-if="num == 3">
				<meetpl :metplist="metplist"></meetpl>
			</view>
			<view v-if="num == 4">
				<meetpl :metplist="metplist"></meetpl>
			</view>
			<view v-if="num == 5">
				<meetpl :metplist="metplist"></meetpl>
			</view>
			<view v-if="num == 6">
				<meetpl :metplist="metplist"></meetpl>
			</view>
			<!-- 已经到底了 -->
			<view class="over" v-if="metplist.length > 0 ? true : false">
				<view class="overtext">已经到底了</view>
			</view>
		</view>
	</view>
</template>

<script>
	import meetpl from "@/components/index/meetplacelist.vue"
	import mockData from "@/data/meetingplace.js"
	export default{
		components:{meetpl},
		data(){
			return{
				listtitle:[],
				metplist:[],
				num:0,
				scrollleft:0,
			}
		},
		onLoad(option) {
			this.num = option.id == undefined ? 0 : option.id
			this.listtitle = mockData.typeList
			this.metplist = mockData.subTypeList[this.num]
		},
		methods:{
			// 切换频道
			changelist(item,index){
				this.num = index
				this.metplist = mockData.subTypeList[index]
			},
		},
		watch:{
			num:{
				handler(nval,oval){
					if(parseInt(nval) < (parseInt(oval) == undefined ? 0 : parseInt(oval))){
						// 说明在递减
						this.scrollleft = (parseInt(nval) - 1) * 100 < 0 ? 0 : (parseInt(nval) - 1) * 100
					}else{
						if(parseInt(nval) > 2){
							// 当dom更新完才执行的方法
							this.$nextTick(function(){
								this.scrollleft = 50 * (parseInt(nval) + 1)
							})
						}
					}
					// console.log('新值',nval,'旧值',oval,'滚动位置',this.scrollleft)
				},
				deep:true
			},
		}
	}
</script>

<style lang="scss">
	.meetingplace{
		background: #f8f8f8;
		/* #ifdef APP-PLUS */
		.meetwrap{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 88upx;
			z-index: 10;
			background: #ffffff;
			border-bottom: 2upx solid #f8f8f8;
			box-sizing: content-box;
		}
		/* #endif */
		/* #ifdef H5 */
		.meetwrap{
			position: fixed;
			top: 44px;
			left: 0;
			width: 100%;
			height: 88upx;
			z-index: 10;
			background: #ffffff;
			border-bottom: 2upx solid #f8f8f8;
			box-sizing: content-box;
		}
		/* #endif */
		.meetdispflex{
			display: flex;
			align-items: center;
			// overflow-x: auto;
		}
		.meetflex{
			border-bottom: 4upx solid #fff;
			box-sizing: border-box;
			white-space: nowrap;
			font-size: 28upx;
			height: 88upx;
			line-height: 88upx;
			padding: 0 20upx;
			margin:  0 20upx;
			letter-spacing: 2upx;
			&.on{
				border-bottom: 4upx solid #d81e06;
			}
		}
		.meetgoodwrap{
			padding-top: 110upx;
			.over{
				position: relative;
				text-align: center;
				padding: 50upx 0;
				height: 50upx;
				line-height: 50upx;
				&::before{
					display: block;
					content: "";
					position: absolute;
					left: 10%;
					top: 50%;
					width: 80%;
					height: 2upx;
					background: #888888;
					z-index: 0;
				}
				.overtext{
					font-size: 24upx;
					background: #f8f8f8;
					padding: 0 30upx;
					display: inline-block;
					position: relative;
					z-index: 1;
					color: #888888;
				}
			}
		}
	}
</style>
