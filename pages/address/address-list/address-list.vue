<template>
	<view class="content">
		<view class="address-list" v-for="(item, index) in addressList" :key="index">
			<view class="address-list-info">
				<view class="address-list-line1">
					<text v-if="item.adresdefault == 1 ? true : false" class="tag">默认</text>
					<text class="address-list-name">{{item.name}}</text>
					<text class="address-list-mobile">{{item.mobile}}</text>
				</view>
				<view class="address-list-line2">
					<text class="address-list-detail">{{item.label}}{{item.address}}</text>
				</view>
			</view>
			<view class="edit" @click="editAddress('amend',item)">
				<image src="../../../static/adress/edit.png"></image>
			</view>
			<view class="delect" @click="deleteAddress(index,item)">
				<image src="../../../static/adress/delect.png"></image>
			</view>
			<!-- <uni-icon type="uni-icon-compose" ></uni-icon> -->
			<!-- <uni-icon type="trash" ></uni-icon> -->
		</view>

		<button class="add-btn" @click="addAddress('add')">新增地址</button>
	</view>
</template>

<script>
	// import uniIcon from '@/components/mine/uni-icon.vue'
	import mockData from '@/data/address.js'
	export default {
		// components: {
		// 	uniIcon
		// },
		data() {
			return {
				addressList: []//展示地址数据列表
			}
		},
		onLoad(option) {
			this.addressList = mockData.addressList
		},
		methods: {
			// 修改地址
			editAddress(type, item) {
				this.$jump('../address-edit/address-edit?type='+type+'&amend='+JSON.stringify(item))
				this.$msg('点击修改')
			},
			// 删除地址
			deleteAddress(index, item) {
				this.addressList.splice(index,1)
				console.log(this.addressList)
				this.$msg('点击删除')
			},
			// 新增地址
			addAddress(type){
				this.$jump('../address-edit/address-edit?type='+type)
			}

		}
	}
</script>

<style lang='scss'>
	.content {
		position: relative;
	}
	.address-list {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		;
		background: #fff;
		position: relative;
	}
	.address-list-info {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.edit{
		image{
			width: 40upx;
			height: 40upx;
		}
	}
	.delect{
		margin-left: 20upx;
		image{
			width: 40upx;
			height: 40upx;
		}
	}
	.address-list-line1 {
		display: flex;
		align-items: center;
		.tag {
			font-size: 24upx;
			color: $theme-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid $theme-color;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address-list-name,
		.address-list-mobile {
			font-size: 30upx;
			color: black;
			margin-right: 30upx;
		}
	}
	.address-list-line2 {
		font-size: 28upx;
		color: gray;
		margin-top: 16upx;
		.address-list-detail {
			margin-right: 30upx;
		}
	}
	.add-btn {
		position: fixed;
		bottom: 16upx;
		z-index: 95;
		margin: 0 30upx;
		width: 690upx;
		height: 80upx;
		line-height: 80upx;
		font-size: 32upx;
		text-align: center;
		color: #fff;
		background-color: $theme-color;
		border-radius: 10upx;
	}
</style>
