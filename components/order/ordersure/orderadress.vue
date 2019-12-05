<template>
	<view class="locationwrap" @click="gosdress">
		<view class="locaimg">
			<image src="/static/location.png"></image>
		</view>
		<view class="locaflex">
			<view class="flexchild">
				<view>收货人：<text class="limitw">{{adressobj.name}}</text></view>
				<view>电话：{{adressobj.mobile}}</view>
			</view>
			<view class="adress">地址：{{adressobj.label+' '+adressobj.address}}</view>
		</view>
		<view class="locaimg changesmart">
			<image src="/static/arrow.png"></image>
		</view>
	</view>
</template>

<script>
	import mockData from '@/data/address.js'
	export default{
		data(){
			return{
				adressobj:{}
			}
		},
		mounted() {
			let _this=this
			_this.queryadress();
			// 全局监听事件
			uni.$on('update',function(data){
				console.log(data)
				_this.queryadress();
			})
		},
		methods:{
			gosdress(){
				this.$jump('/pages/address/address-list/address-list')
			},
			queryadress(){
				mockData.addressList.map((item,index)=>{
					if(item.adresdefault === 1){
						// console.log(item)
						this.adressobj = item
					}
				})
			}
		},
		watch:{
			$route(to,from){
				if(from.path === '/pages/address/address-list/address-list'){
					this.queryadress()
				}
				// console.log('to',to,'from',from)
			}
		}
	}
</script>

<style lang="scss">
	.locationwrap{
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2upx solid #f2f2f2;
		background: #ffffff;
		padding: 20upx;
		font-size: 28upx;
		.locaflex{
			flex: 1;
			.flexchild{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.limitw{
					width: 140upx;
					overflow: hidden;
					display: inline-block;
					white-space: nowrap;
					text-overflow: ellipsis;
					vertical-align: text-bottom;
				}
			}
			.adress{
				
			}
		}
		.locaimg{
			width: 60upx;
			&.changesmart{
				text-align: right;
				width: 36upx;
				image{
					width: 14upx;
					height: 28upx;
				}
			}
			image{
				width: 40upx;
				height: 40upx;
				
			}
		}
	}
</style>
