<template>
	<view class="cardbag">
		<view class="discountwarp">
			<view class="discountlist" v-for="(item,index) in list" :key="index">
				<view v-if="item.type === '1'">
					<view class="discounnav" :class="'green'">
						<view class="discounnav_l">
							<view class="price">
								<text>￥</text>
								{{item.price}}
							</view>
							<view class="moneyoff">{{item.moneyoff}}</view>
							<view class="outtime">有效期:{{item.outtime}}</view>
						</view>
						<view class="discounnav_r">
							<button class="changecolor" size="mini" :disabled="item.type === '1'?false:true" @click="getdiscount(item,index)">{{item.name}}</button>
						</view>
					</view>
				</view>
				<view v-if="item.type === '2'">
					<view class="discounnav" :class="'orange'">
						<view class="discounnav_l">
							<view class="price">
								<text>￥</text>
								{{item.price}}
							</view>
							<view class="moneyoff">{{item.moneyoff}}</view>
							<view class="outtime">有效期:{{item.outtime}}</view>
						</view>
						<view class="discounnav_r">
							<button class="changecolor" size="mini" :disabled="item.type === '2'?false:true" @click="getdiscount(item,index)">{{item.name}}</button>
						</view>
					</view>
				</view>
				<view v-if="item.type === '3'">
					<view class="discounnav" :class="'gray'">
						<view class="discounnav_l">
							<view class="price">
								<text>￥</text>
								{{item.price}}
							</view>
							<view class="moneyoff">{{item.moneyoff}}</view>
							<view class="outtime">有效期:{{item.outtime}}</view>
						</view>
						<view class="discounnav_r">
							<button size="mini" :disabled="true" @click="getdiscount(item,index)" class="changecolor">{{item.name}}</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: "card-discount",
		props: {
			discountinfo: {
				type:Array,
				default:function(){
					return []
				}
			},
		},
		data() {
			return {
				list:[],
			}
		},
		mounted() {
			this.list = this.discountinfo
		},
		methods: {
			getdiscount(item,index){
				console.log(item)
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
					this.list.splice(index,1,item)
				}
			}
		},
	}
</script>

<style lang="scss">
	.cardbag{
		text-align: center;
		padding-top: 30upx;
	}
	.discountwarp{
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 20upx;
	}
	.discountlist{
		flex: 1;
		margin-bottom: 40upx;
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
</style>
