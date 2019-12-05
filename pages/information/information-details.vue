<template>
	<view class="infordatails">
		<!-- 买家 -->
		<view class="infordwrap" v-for="(item,index) in inforlist" :key="index">
			<view class="inforheadtext">
				<view class="infortime">{{item.cname}} --- {{item.endtime}}</view>
			</view>
			<view class="inforflex" v-if="index%2===0?true:false">
				<view class="inforheadimg">
					<image class="inforimg" :src="item.goodsImg" mode="aspectFit"></image>
				</view>
				<view class="inforcontent">
					<view class="empty-arrow">
						<view class="copy-empty-arrow"></view>
					</view>
					<view class="infortext">{{item.Ctext}}</view>
				</view>
			</view>
			<view class="inforflex inforright" v-else>
				<view class="inforcontent">
					<view class="empty-arrow">
						<view class="copy-empty-arrow"></view>
					</view>
					<view class="infortext">{{item.Ctext}}</view>
				</view>
				<view class="inforheadimg">
					<image class="inforimg" :src="item.goodsImg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<!-- 卖家 -->
	</view>
</template>

<script>
	import mockData from '@/mock/information/information.js'
	export default{
		components: {},
		data(){
			return{
				inforlist:[],
			}
		},
		onLoad() {
			this.querydata()
		},
		onShow() {},
		methods:{
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
	.infordatails{
		padding-top: 20upx;
		.infordwrap{
			padding-bottom: 20upx;
			.inforheadtext{
				display: flex;
				align-items: center;
				justify-content: center;
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
			.inforflex{
				display: flex;
				align-items: center;
				padding: 10upx 20upx;
				position: relative;
				&.inforright{
					justify-content: flex-end;
					.inforheadimg{
						width: 80upx;
						height: 80upx;
						background: rgba($color: #555555, $alpha: 0.5);
						border-radius: 50%;
						margin-left: 20upx;
						.inforimg{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.inforcontent{
						flex: 0 0 60%;
						display: flex;
						flex-direction: column;
						position: relative;
						.empty-arrow{
							position: absolute;
							right: -14upx;
							left: auto;
							top: 37%;
							.copy-empty-arrow{
								border-bottom: 12upx solid transparent;
								border-left: 16upx solid #CCCCCC;
								border-top: 12upx solid transparent;
								border-right: none;
								position: relative;
								&:after{
									display: block;
									content: "";
									position: absolute;
									right: 4upx;
									left: auto;
									top: -12upx;
									border-bottom: 12upx solid transparent;
									border-left: 16upx solid #FFFFFF;
									border-top: 12upx solid transparent;
									border-right: none;
								}
							}
						}
						.infortext{
							flex: 1;
							word-break: break-all;
							font-size: 28upx;
							border: 2upx solid #CCCCCC;
							border-radius: 8upx;
							padding: 10upx;
							background: #FFFFFF;
						}
					}
				}
				.inforheadimg{
					width: 80upx;
					height: 80upx;
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
					flex: 0 0 60%;
					display: flex;
					flex-direction: column;
					position: relative;
					.empty-arrow{
						position: absolute;
						left: -14upx;
						top: 37%;
						right: auto;
						.copy-empty-arrow{
							border-bottom: 12upx solid transparent;
							border-right: 16upx solid #CCCCCC;
							border-top: 12upx solid transparent;
							border-left: none;
							position: relative;
							&:after{
								display: block;
								content: "";
								position: absolute;
								left: 4upx;
								right: auto;
								top: -12upx;
								border-bottom: 12upx solid transparent;
								border-right: 16upx solid #FFFFFF;
								border-top: 12upx solid transparent;
								border-left: none;
							}
						}
					}
					.infortext{
						flex: 1;
						word-break: break-all;
						font-size: 28upx;
						border: 2upx solid #CCCCCC;
						border-radius: 8upx;
						padding: 10upx;
						background: #FFFFFF;
					}
				}
			}
		}
	}
</style>
