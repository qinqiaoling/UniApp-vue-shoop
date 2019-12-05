<template>
	<view class="meetplacelist">
		<view class="multi-list">
			<view v-for='(item,index) in metplist' :key='index' class="multi-product2" @click="detail(item)">
				<image class="multi-image1" :src="item.image"></image>
				<view class="multi-description"> 
					<text class="multi-title">{{item.title}}</text> 
					<!-- <text class="multi-subtitle">{{item.subtitle}}</text> -->
					<view class="multi-wrap">
						<text class="multi-specialprice">{{item.specialprice}}</text>
						<text class="multi-originprice">{{item.originprice}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'meetplace',
		props: {
			metplist: {
				type: Array,
				deault: function() {
					return []
				}
			}
		},
		methods:{
			detail(item){
				// console.log(item)
				let newprice = item.specialprice?item.specialprice.split('￥').join(''):'';
				let oldprice = item.originprice?item.originprice.split('原价￥').join(''):'';
				if(item.specialprice){
					if(item.originprice){
						this.$jump('/pages/goods/detail/detail?text='+item.title+'&src='+item.image+'&newprice='+newprice+'&oldprice='+oldprice)
					}else{
						this.$jump('/pages/goods/detail/detail?text='+item.title+'&src='+item.image+'&newprice='+newprice)
					}
				}else{
					this.$jump('/pages/goods/detail/detail?text='+item.title+'&src='+item.image)
				}
			},
		}
	}
</script>

<style lang="scss">
	.meetplacelist{
		background: #ffffff;
		padding-top: 20upx;
		.multi-list{
			display: flex;
			border-color: #0000ff;
			flex-wrap: wrap;
			justify-content: space-between;
			margin: 0 24upx;
			.multi-product2{
				.multi-image1{
					border-radius: 8upx 8upx 0 0;
					width: 332upx;
					height: 332upx;
				}
				.multi-description{
					display: flex;
					flex-direction: column;
					margin-bottom: 20upx;
					.multi-title{
						color: #1A1A1A;
						font-size: 26upx;
						line-height: 34upx;
						margin: 0 8upx;
					}
					.multi-wrap{
						display: flex;
						align-items: center;
					}
					.multi-subtitle{}
					.multi-specialprice{
						color: #fa2a2d;
						font-size: 20upx;
						line-height: 40upx;
						margin-left: 8upx;
					}
					.multi-originprice{
						color: #000000;
						opacity: 0.5;
						text-decoration: line-through;
						font-size: 20upx;
						line-height: 40upx;
						margin-left: 8upx;
					}
				}
			}
		}
	}
</style>
