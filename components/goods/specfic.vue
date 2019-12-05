<template>
	<view class="specfic-content"> 
		<text class="specfic-title">规格</text>
		<view>
			<text 
				v-for="(item,index) in specficdata.specfic" 
				:key='index' class="specfic-item" 
				:class="item.id === specnum ? 'active' : ''"
				@click="specficFun(index,item.value)">
				{{item.value}}
			</text>
		</view>
		<text class="specfic-title">尺寸</text>
		<view>
			<text 
				v-for="(item,index) in specficdata.size" 
				:key='index' class="specfic-item" 
				:class="item.id === sizenum ? 'active' : ''"
				@click="sizeFun(index,item.value)">
				{{item.value}}
			 </text>
		</view>
		<text class="specfic-title">购买数量</text>
		<uni-number-box 
			class="limitw" 
			@eventChange="numberChange" 
			:min="1" 
			:max="100"
			:value="1"
			:isMin="1===1">
		</uni-number-box>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/cart/uni-number-box.vue'
	export default {
		name: 'specfic',
		components: {
			uniNumberBox
		},
		props: {
			specficdata: {}
		},
		data(){
			return{
				specnum:0,
				sizenum:0,
				specobj:{},
			}
		},
		mounted() {
			this.$nextTick(function(){
				this.specficFun(this.specnum,this.specficdata.specfic[0].value)
				this.sizeFun(this.sizenum,this.specficdata.size[0].value)
				this.numberChange();
			})
		},
		methods: {
			//选择规格		
			specficFun(index,item) {
				this.specnum = index
				this.specobj.specification = item
				this.$emit("listenTochildEvent",this.specobj);
				// console.log(index,item,this.specobj)
			},
			//选择尺寸		
			sizeFun(index,item) {
				this.sizenum = index
				this.specobj.measure = item
				this.$emit("listenTochildEvent",this.specobj);
				// console.log(index,item,this.specobj)
			},
			numberChange(val) {
				this.specobj.number = val ? val.number : 1
				this.$emit("listenTochildEvent",this.specobj);
				// console.log(val,this.specobj)
			}
		}
	}
</script>

<style>
	.specfic-content {
		display: flex;
		flex-direction: column;
		border-bottom: 16upx solid #F2F2F2;
		padding: 24upx 32upx 32upx 32upx;
	}
	.specfic-content .limitw{
		width: 184upx;
	}
	.specfic-title {
		font-size: 32upx;
		color: #1a1a1a;
		margin-bottom: 10upx;
	}
	.specfic-item {
		min-width: 50upx;
		text-align: center;
		padding: 0 8upx;
		margin: 0upx 16upx 20upx 0upx;
		font-size: 24upx;
		color: #1a1a1a;
		border-radius: 8upx;
		background-color: #f2f2f2;
		display: inline-block;
		word-break: break-all;
		height: 40upx;
		line-height: 40upx;
	}
	.specfic-item.active {
		color: #ff7500;
		border: 1upx solid #ff7500;
		border-radius: 8upx;
		background-color: #fff;
	}
</style>
