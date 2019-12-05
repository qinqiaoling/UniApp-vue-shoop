<template>
	<view class="gocoupon">
		<uni-popup class="gocoupon" :show="coupuptype === 'typecoupup'" position="bottom" @hidePopup="togglePopup('')">
			<view class="bottom-title">
				<text>优惠券</text>
				<text @click="togglePopup('')">X</text>
			</view>
			<view class="bottom-content">
				<view class="discountwarp">
					<view class="discountlist" v-for="(item,index) in couponlist" :key="index">
						<view class="discounnav" :class="item.type === '1'?'green':'orange'">
							<view class="discounnav_l">
								<view class="price">
									<text>￥</text>
									{{item.price}}
								</view>
								<view class="moneyoff">{{item.moneyoff}}</view>
								<view class="outtime">有效期:{{item.outtime}}</view>
							</view>
							<view class="discounnav_r">
								<button 
									class="changecolor" 
									size="mini" 
									@click="getdiscount(item,index)">
									{{item.name}}
								</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/common/uni-popup/uni-popup.vue"
	export default {
		name: 'good-coupon',
		components:{uniPopup},
		props: {
			list: {
				type:Array,
				default:function(){
					return []
				}
			},
			coupup:'',
		},
		data(){
			return{
				coupuptype:'',
				couponlist:[],
			}
		},
		mounted() {
			this.$nextTick(function(){
				this.couponlist = this.list
			})
		},
		methods:{
			togglePopup(type) {
				this.coupuptype = type;
			},
			// 判断已领取就显示重复领取，未领取就弹出已领取
			getdiscount(item,index){
				// console.log(item)
				if(item.type === '2'){
					uni.showToast({
						icon:'none',
						title:'已领取，请勿重复领取'
					})
				}else if(item.type === '1'){
					uni.showToast({
						icon:'none',
						title:'已领取'
					})
					item.type = '2'
					item.name = '已领取'
					this.couponlist.splice(index,1,item)
				}
			}
		}
	}
</script>

<style lang="scss">
	.gocoupon{
		.bottom-title{
			font-size: 32upx;
			border-bottom: 2upx solid #e6dfdf;
			padding: 0 20upx;
			text-align: left;
			line-height: 80upx;
			display: flex;
			justify-content: space-between;
		}
		.bottom-content{
			overflow-y: auto;
			height: 600upx;
			line-height: 1 !important;
		}
		.discountwarp{
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 20upx;
		}
		.discountlist{
			flex: 1;
			margin: 20upx 0;
		}
		.discounnav{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20upx;
			border: 1upx solid #e0dcdc;
			box-sizing: border-box;
			border-radius: 8upx;
		}
		.discounnav.green{
			background: #def5de;
			color: #5c6d32;
			.discounnav_l{
				border-right: 1upx dashed #5c6d32;
			}
			.changecolor{
				color: #5c6d32;
			}
		}
		.discounnav.orange{
			background: #FFF1E6;
			color: #FF5101;
			.discounnav_l{
				border-right: 1upx dashed #FF5101;
			}
			.changecolor{
				color: #FF5101;
			}
		}
		.discounnav.gray{
			background: #efeff4;
			color: #7b7978;
			.discounnav_l{
				border-right: 1upx dashed #7b7978;
			}
			.changecolor{
				color: #7b7978;
			}
		}
		.discounnav_l{
			text-align: left;
			flex: 1;
			border-right: 1upx dashed #FF5101;
			.price{
				font-size: 50upx;
				font-weight: bold;
				text{
					font-size: 28upx;
					margin-left: 10upx;
				}
			}
			.moneyoff{
				font-size: 28upx;
				margin: 10upx 0;
			}
			.outtime{
				font-size: 24upx;
			}
		}
		.discounnav_r{
			font-size: 32upx;
			width: 160upx;
			text-align: center;
			.changecolor{
				background: none;
				font-size: 28upx;
				&::after{
					display: none;
				}
			}
		}
	}
</style>
