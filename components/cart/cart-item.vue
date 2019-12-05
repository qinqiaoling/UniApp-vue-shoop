<template>
	<view>
		<view class="cart-list">
			<block v-for="(item, index) in cartList" :key="item.id">
				<view class="cart-item">
					<checkbox :checked='item.checked' color='#FF3333' @click="check('item', index)" />
					<view class="image-wrapper">
						<image :src="item.goods_image" mode="aspectFill" @click="carlist(item)"></image>
					</view>
					<view class="item-right">
						<text class="title">{{item.goods_name}}</text>
						<text class="attr">{{item.goods_spec}}</text>
						<view class="item-last">
							<text class="discount-price">¥{{item.goods_discount}}</text>
							<text class="goods-price" v-show="item.goods_price?true:false">¥{{item.goods_price}}</text>
							<uni-number-box :min="1" :max="100" :value="item.number" :isMin="item.number===1" :index="index" @eventChange="numberChange" :data-index='item.index'></uni-number-box>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 底部菜单栏 -->
		<view class="action-section">
			<view class="total-box">
				<text class="price-title">合计：</text>
				<text class="price-number">¥{{totalPrice}}</text>
			</view>
			<view  class="confirm-btn" @click="createOrder">去结算</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/cart/uni-number-box.vue'
	export default {
		name: 'cart-item',
		components: {
			uniNumberBox
		},
		props: {
			cartList: {
				type: Array,
				default: function() {
					return []
				}
			},
		},
		data() {
			return {
				totalPrice: 0
			}
		},
		methods: {
			//数量
			numberChange(data) {
				this.cartList[data.index].number = data.number;
				this.updateTotalPrice();
			},
			//计算总价
			updateTotalPrice() {
				let list = this.cartList;
				if (list.length === 0) {
					return;
				}
				let totalPrice = 0;
				list.forEach(item => {
					if (item.checked === true) {
						totalPrice += item.goods_price * item.number;
					}
				})
				this.totalPrice = Number(totalPrice.toFixed(2));
			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.cartList[index].checked = !this.cartList[index].checked
				}
				this.updateTotalPrice();
			},
			createOrder(){
				this.$msg('生成订单中')
				let orderdata = [];
				let orderjson = {};
				this.cartList.map((item)=>{
					orderjson={
						state: 1,
						image: item.goods_image,
						title: item.goods_name,
						size: item.goods_spec,
						amount: item.number,
						money: item.goods_discount,
					}
					orderdata.push(orderjson)
				})
				this.$jump('/pages/order/ordersure?buy='+JSON.stringify(orderdata))
				// console.log(orderdata)
			},
			carlist(item){
				this.$jump('/pages/goods/detail/detail?text='+item.goods_name+'&src='+item.goods_image+'&newprice='+item.goods_discount+'&oldprice='+item.goods_price)
				// console.log(item)
			}
		},
		mounted() {
			this.updateTotalPrice();
		}
		
	}
</script>

<style lang="scss">
	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		align-content: center;
		align-items: center;
		padding: 30upx 40upx;

		.cart-check {
			width: 30upx;
			height: 30upx;
		}

		.image-wrapper {
			width: 140upx;
			height: 140upx;
			flex-shrink: 0;
			position: relative;

			image {
				width: 140upx;
				height: 140upx;
				border-radius: 8upx;
			}
		}


		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title{
				font-size: 30upx;
				color: black;
				height: 40upx;
				line-height: 40upx;
			}
			

			.attr {
				font-size: 26upx;
				color: gray;
				height: 50upx;
				line-height: 50upx;
			}
			.item-last{
				display: flex;
				align-items:center;
				justify-content: space-between;
				.discount-price {
					font-size: 30upx;
					color: $theme-color;
					height: 50upx;
					line-height: 50upx;
				}
				.goods-price{
					margin: 15upx;
					flex-grow: 1;
					font-size: 24upx;
					color:gray;
					text-decoration: line-through;
				}
			}

			

			
		}

	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		bottom: 0;
		z-index: 95;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 750upx;
		height: 100upx;
		background: #FFFFFF;	

		.total-box {
			display: flex;
			
			margin-left: 30upx;

			.price-title {
				font-size: 32upx;
				color: black;
			}

			.price-number {
				font-size: 32upx;
				color: $theme-color;
			}


		}

		.confirm-btn {
			width: 250upx;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			font-size: 32upx;
			background: $theme-color;
			color: #FFFFFF;
			
		}
	}

	
</style>
