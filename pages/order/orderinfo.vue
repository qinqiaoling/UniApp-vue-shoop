<template>
	<view class="orderinfo">
		<view class="header">
			<view class="headerl">
				<view v-if="alllist[0].state == 1">等待买家付款</view>
				<view v-if="alllist[0].state == 2">等待买家确认收货</view>
				<view v-if="alllist[0].state == 3||alllist[0].state == 4">交易成功</view>
				<view class="limitsize" v-if="alllist[0].state == 1||alllist[0].state == 2">剩20小时20分自动关闭订单</view>
			</view>
			<image src="/static/order/orderinfo/kabag.png" class="headerr"></image>
		</view>
		<view class="adress">
			<view class="adress-top">
				<view>收货人：{{adressobj.adressmen}}</view>
				<view>{{adressobj.adresstel}}</view>
			</view>
			<view class="adress-bot">收货地址：{{adressobj.adresssh}}</view>
		</view>
		<view class="ordershoop">
			<view v-for="(item,index) in alllist" :key='index' class="goos_lists">
				<view class="space_between">
					<view class="time_clock flex_row">
						<image class="clock_image" src="/static/order/clock.png"></image> 
						<text class="goods_time">2018-11-28 17:15:20 ----订单编号：{{item.id}}</text>
					</view>
					<view class="_state  align_items_center">
						<text v-if="item.state == 1" class="goods_state">待付款</text>
						<text v-if="item.state == 2" class="goods_state">待收货</text>
						<text v-if="item.state == 3" class="goods_state">待评价</text>
						<text v-if="item.state == 4" class="goods_state">交易完成</text>
						<!-- <image v-if="item.state == 4" class="delete_image" src="/static/order/delete.png" @click="delectimg(item)"></image> -->
					</view>
				</view>
				<view @click="goToPage(item)" class="sigle_goos_list">
					<view class="image_contaner">
						<image class="goods_image" :src="item.image"></image>
					</view>
					<view class="goods_description flex_row">
						<view class="title_size flex_column">
							<text class="goods_title">{{item.title}}</text>
							<text class="goods_size">{{item.size}}</text>
						</view>
						<view class="money_amount flex_column">
							<text class="goods_money">￥{{item.money}}</text>
							<text class="goods_amount">X {{item.amount}}</text> 
						</view>
					</view>
				</view>
				<view class="bottom_amount_money">
					<text class="_amount">共1件商品</text>
					<text class="need_pay" v-if="item.state == 1">
						需付款 ：</text>
					<text class="need_pay" v-if="item.state == 3 || item.state == 4 || item.state == 2"> 实付款 ：</text>
					<text class="_money">￥{{item.money*item.amount}}</text>
				</view>
				<view class="state_btn">
					<text v-if="item.state == 1" class="_btn" @click="sure(item)">去支付</text>
					<text v-if="item.state == 4" class="_btn" @click="sure(item)">再次购买</text>
					<text v-if="item.state == 3" class="_btn" @click="sure(item)">去评价</text>
					<text v-if="item.state == 2" class="_btn" @click="sure(item)">确认收货</text>
				</view>
			</view>
		</view>
		<view class="ordercode">
			<view class="ordercodev">订单编号：{{ordercodeobj.ordercodev}}</view>
			<view class="ordercodev">支付宝交易号：{{ordercodeobj.alipaycode}}</view>
			<view class="ordercodev">创建时间：{{ordercodeobj.creattime}}</view>
			<view class="copy" @click="copy()">复制</view>
		</view>
		<view class="contactway">
			<view class="contactwayflex">
				<view class="flexv" v-for="(item,index) in contactwaylist" :key="index">
					<view class="fleximg" @click="contactfun(item)">
						<image :src="item.imgsrc" class="imgicon"></image>
						{{item.ctext}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				alllist:[],
				adressobj:{
					adressmen:'小李',
					adresstel:'86-13345678976',
					adresssh:'湖北省武汉市江岸区云岭及桃子社区256号楼601室'
				},
				ordercodeobj:{
					ordercodev:'2884994400404004',
					alipaycode:'8298029022020200202020',
					creattime:'2019-12-09 12:12:12',
				},
				contactwaylist:[
					{
						imgsrc:'/static/order/orderinfo/wangwang.png',
						ctext:'联系卖家',
						type:0
					},
					{
						imgsrc:'/static/order/orderinfo/telphone.png',
						ctext:'拨打电话',
						type:1
					}
				],
			}
		},
		onLoad(option) {
			console.log(JSON.parse(option.info))
			this.alllist.push(JSON.parse(option.info))
		},
		methods:{
			goToPage(val){
				console.log(val)
			},
			sure(val){
				console.log(val)
			},
			copy(){
				console.log(this.ordercodeobj)
			},
			contactfun(val){
				if(val.type == 0){
					console.log('联系卖家')
				}else{
					console.log('拨打电话')
				}
			},
		}
	}
</script>

<style lang="scss">
	@import "../../static/order/orderinfo/orderinfo.scss" 
</style>
