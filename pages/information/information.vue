<template>
	<view class="informationwrap">
		<!-- <uni-swipe-action :options="options" @click="bindClick" @change="change">
		    <view class="cont" @click="godetails">SwipeAction 基础使用场景</view>
		</uni-swipe-action> -->
		<uni-swipe-action :options="options" @click="bindClick" @change="change(item,index)" v-for="(item,index) in inforlist" :key="index">
			<view class="inforflex" @click="godetails">
				<view class="inforheadimg">
					<image class="inforimg" :src="item.goodsImg" mode="aspectFit"></image>
				</view>
				<view class="inforcontent">
					<view class="inforheadtext">
						<view class="inforh">{{item.cname}}</view>
						<view class="infortime">{{item.endtime}}</view>
					</view>
					<view class="infortext">{{item.Ctext}}</view>
				</view>
			</view>
		</uni-swipe-action>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import mockData from '@/mock/information/information.js'
	export default{
		components: {uniSwipeAction},
		data(){
			return{
				options:[
					{
						text: '取消',
						style: {
							backgroundColor: '#007aff'
						}
					}, {
						text: '确认',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				inforlist:[],
				checkeditem:0,
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.querydata()
		},
		methods:{
			godetails(){
				// 跳转到消息详情页面
				this.$jump('/pages/information/information-details')
			},
			change(val,index){
				// 改变滑动操作的状态
			  console.log('当前开启状态：',val,index)
			  this.checkeditem = index
			},
			bindClick(e) {
				// 点击滑动操作的按钮，确认和取消
				console.log(e)
				// uni.showToast({
				// 	title: `点击了${e.content.text}按钮`,
				// 	icon: 'none'
				// })
				if(e.index === 1){
					this.inforlist.splice(this.checkeditem,1)
				}
			},
			querydata(){
				// request请求与mock模拟数据互通
				uni.request({
					url:'/api/load',
					method:'GET',
					success: (res) => {
						console.log(res)
						let qdata = res.data.data
						let sortdata = []
						let getdatetime;
						qdata.map((item,index)=>{
							getdatetime = new Date(item.endtime).getTime()
							item.getdatetime = getdatetime
							sortdata.push(item)
						})
						sortdata.sort(function(a,b){
							return b.getdatetime - a.getdatetime
						})
						this.inforlist = sortdata
					}
				})
			},
		},
		watch:{}
	}
</script>

<style lang="scss">
	.informationwrap{
		.inforflex{
			display: flex;
			align-items: center;
			padding: 20upx;
			position: relative;
			&:after{
				display: block;
				content: "";
				position: absolute;
				bottom: 0;
				left: 140upx;
				right: 20upx;
				border-bottom: 2upx solid #C0C0C0;
			}
			.inforheadimg{
				width: 100upx;
				height: 100upx;
				background: rgba($color: #555555, $alpha: 0.5);
				border-radius: 50%;
				margin-right: 20upx;
				.inforimg{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.inforcontent{
				flex: 1;
				display: flex;
				flex-direction: column;
				.inforheadtext{
					display: flex;
					align-items: center;
					.inforh{
						flex: 1;
						font-size: 32upx;
						font-weight: bold;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						display: -webkit-box;
						letter-spacing: 4upx;
					}
					.infortime{
						margin-left: 20upx;
						font-size: 24upx;
					}
				}
				.infortext{
					flex: 1;
					word-break: break-all;
					overflow: hidden;
					text-overflow:ellipsis;
					-webkit-line-clamp:2;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					font-size: 28upx;
				}
			}
		}
	}
</style>
