<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="typeClickMain(item,index)" :key="index" :class="index==typeActive?'active':''" v-for="(item,index) in typeList">
					{{item.title}}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
				<view  class="nav-right-item" v-for="(item,index) in subType_List" :key="index" @click="goProduct(item)">
					<view class="addmargin">
						<view class="addbj">
							<image mode="aspectFit" :src="item.image" />
						</view>
					</view>
					<view class="addw">{{item.title}}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import mockData from '@/data/type.js'
	export default{
		name:'tree-list',
		props:{
			typeList:{
				type:Array,
				default:function(){
					return []
				}
			},
			subTypeList:{
				type:Array,
				default:function(){
					return []
				}
			}
		},
		data() {
			return {
				height: 0,
				typeActive: 0,
				scrollTop: 0,
				scrollHeight: 0,
				subType_List:[],
			}
		},
		mounted() {
			this.height = uni.getSystemInfoSync().windowHeight;
			this.subType_List = this.subTypeList
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			typeClickMain(categroy, index) {
				this.typeActive = index;
				mockData.subTypeList.map((itm,inx)=>{
					if(index === inx){
						this.subType_List = itm
					}
				})
				// let subindex = 'mockData.subTypeList'+index
				// let subtl = eval("var x=10;var y=20;(x*y)")// eval 计算字符串，其中含有要计算的 JavaScript 表达式或要执行的语句
				// console.log(subtl,subindex)
				// console.log(mockData.subTypeList,index)
			},
			goProduct(item){
				// console.log(item)
				this.$jump('/pages/goods/detail/detail?text='+item.title+'&src='+item.image)
			}
		},
		
	}
</script>

<style lang="scss">
	page{
		background-color: white
	}
	.page-body {
		display: flex;
	}
	.nav-left {
		width: 187.5upx;
		.nav-left-item {
			height: 100upx;
			border-right: solid 1px #E0E0E0;
			font-size: 30upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.active {
			color: $theme-color;
		}
	}
	.nav-right {
		width: 562.5upx;
		.nav-right-item {
			width: 33.33%;
			// height: 220upx;
			float: left;
			text-align: center;
			font-size: 28upx;
			.addw{
				width: 150upx;
				margin: 0 auto;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.addmargin{
				margin: 10upx 0;
			}
			.addbj{
				width: 150upx;
				height: 150upx;
				margin: 0 auto;
				background: #E0E0E0;
				image {
					width: 150upx;
					height: 150upx;
				}
			}
		}
	}
</style>
