<template>
	<view class="content">
		<view class="address-item ">
			<text class="address-item-title">姓名</text>
			<input class="address-item-input" type="text" v-model="addressData.name" placeholder="收货人姓名"  />
		</view>
		<view class="address-item ">
			<text class="address-item-title">电话</text>
			<input class="address-item-input" type="number" v-model="addressData.mobile" placeholder="收货人手机号"  />
		</view>
		<view class="address-item " @click="showCityPicker">
			<text class="address-item-title">地区</text>
			<text class="address-item-input">
				{{addressData.label}}
			</text>
		</view>
		<view class="address-item ">
			<text class="address-item-title">详细地址</text>
			<input class="address-item-input" type="text" v-model="addressData.address" placeholder="街道门牌、楼层房间号等信息"  />
		</view>
		<view class="address-item ">
			<text class="address-item-title">邮政编码</text>
			<input class="address-item-input" type="number" v-model="addressData.postcode" placeholder="邮政编码"  />
		</view>

		<view class="address-item default-item">
			<text class="address-item-title">设为默认</text>
			<switch :checked="addressData.adresdefault==1" color='#d81e06' @change="switchChange" />
		</view>
		<button class="address-add-btn" @click="confirm">保存</button>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue' //选择地区组件
	import mockData from '@/data/address.js'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				addressData: {
					name: '',
					mobile: '',
					label: '选择省/市/区',
					address: '',
					adresdefault: false,
				},
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#d81e06',
				type:'add',//判断是新增还是修改
				amenddata:{},//修改地址接收地址栏传来的数据
			}
		},
		onLoad(option) {
			this.type = option.type
			this.amenddata = option.amend
			if(this.type == 'add'){
				this.addressData = this.addressData
			}else if(this.type == 'amend'){
				this.addressData = JSON.parse(this.amenddata)
			}
			console.log(option)
		},
		methods: {
			// 判断地址是否设为默认
			switchChange(e) {
				this.addressData.adresdefault = e.detail.value ? 1 : 0;
			},
			//提交
			confirm() {
				let data = this.addressData;
				if (!data.name) {
					this.$msg('请填写收货人姓名');
					return;
				}
				if(!/[^\u4e00-\u9fa5]/.test(data.name)){
					if(data.name.length>4){
						this.$msg('收货人姓名最多4个汉字');
						return;
					}
				}else{
					this.$msg('收货人姓名必须全是中文');
					return;
				}
				if (!/(^1[0-9]{10}$)/.test(data.mobile)) {
					this.$msg('请输入正确的手机号');
					return;
				}
				if (!data.label) {
					this.$msg('请选择地区信息');
					return;
				}
				if (!data.address) {
					this.$msg('请输入详细地址');
					return;
				}
				if(this.type == 'add'){
					data.id = Number(Math.random().toString().substr(3,5) + Date.now()).toString(36)
					// 添加成功后如果设为默认地址,需把源数据里其他设为默认地址的adresdefault参数改为0
					if(data.adresdefault ==1){
						mockData.addressList.map((itm,inx)=>{
							itm.adresdefault = 0
							return itm
						})
						// splice('待添加数据的下标','添加数据长度','待添加数据项')
						mockData.addressList.splice(0,0,data);//新增地址添加到原地址列表
					}else{
						// splice('待添加数据的下标','添加数据长度','待添加数据项')
						mockData.addressList.splice(0,0,data);//新增地址添加到原地址列表
					}
				}else if(this.type == 'amend'){
					// 添加成功后如果设为默认地址,需把源数据里其他设为默认地址的adresdefault参数改为0
					if(data.adresdefault ==1){
						mockData.addressList.map((itm,inx)=>{
							itm.adresdefault = 0
							return itm
						})
						// splice('待添加数据的下标','添加数据长度','待添加数据项')
						mockData.addressList.splice(data.id,1,data);//新增地址添加到原地址列表
					}else{
						// splice('待添加数据的下标','添加数据长度','待添加数据项')
						mockData.addressList.splice(data.id,1,data);//新增地址添加到原地址列表
					}
				}
				console.log(data)
				this.$msg('保存成功')
				// 添加成功后回退到上一页 
				uni.navigateBack({
					delta:1
				})
			},
			// 三级联动选择
			showCityPicker() {
				this.$refs.mpvueCityPicker.show()
				console.log('showpicker')
			},
			// 三级联动选择-确定按钮
			onConfirm(e) {
				console.log(e)
				this.addressData.label=e.label
			},
			// 三级联动选择-取消按钮
			onCancel(e){
				console.log(e)
			}
		},
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}

	.address-item {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 100upx;
		background: #fff;
		border-bottom:1upx solid #F8F8F8;

		.address-item-title {
			flex-shrink: 0;
			width: 200upx;
			font-size: 32upx;
			color: black;
		}

		.address-item-input {
			flex: 1;
			font-size: 32upx;
			color: black;
		}

		
	}

	.default-item {
		.address-item-title {
			flex: 1;
		}
	
		switch {
			transform: scale(.7);
		}
	}

	.address-add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: 32upx;
		color: #fff;
		background-color: $theme-color;
		border-radius: 10upx;
	}
</style>
