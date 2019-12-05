<template>
	<view class="uni-numbox">
		<view class="uni-numbox-minus" @click="_calcValue('subtract')">
			<text :class="minDisabled?'uni-numbox-disabled': ''" >-</text>
		</view>
		<input 
			class="uni-numbox-value" 
			type="number" 
			:disabled="disabled"
			:value="inputValue" 
			@blur="_onBlur"
			@input="_onInput"
		>
		<view 
			class="uni-numbox-plus" 
			@click="_calcValue('add')"
		>
			<text :class="maxDisabled?'uni-numbox-disabled': ''" >+</text>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'uni-number-box',
		props: {
			isMax: {
				type: Boolean,
				default: false
			},
			isMin: {
				type: Boolean,
				default: false
			},
			index: {
				type: Number,
				default: 0
			},
			value: {
				type: Number,
				default: 0
			},
			min: {
				type: Number,
				default: -Infinity
			},
			max: {
				type: Number,
				default: Infinity
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				inputValue: this.value,
				minDisabled: false,
				maxDisabled: false
			}
		},
		created(){
			this.maxDisabled = this.isMax;
			this.minDisabled = this.isMin;
		},
		computed: {

		},
		watch: {
			inputValue(number) {
				let data = {
					number: number,
					index: this.index
				}
				if(number >= 100){
					data.number = 100
				}else if(number<=1){
					data.number = 1
				}else{
					data.number = number
				}
				console.log(number)
				this.$emit('eventChange', data);
			}
		},
		methods: {
			// 点击加减按钮时触发
			_calcValue(type) {
				const scale = this._getDecimalScale();
				let value = this.inputValue * scale;
				let newValue = 0;
				let step = this.step * scale;
				
				if(type === 'subtract'){
					// 减
					newValue = value - step;
					if (newValue <= this.min){
						this.minDisabled = true;
					}
					if(newValue < this.min){
						newValue = this.min
					}
					if(newValue < this.max && this.maxDisabled === true){
						this.maxDisabled = false;
					}
				}else if(type === 'add'){
					// 加
					newValue = value + step;
					if (newValue >= this.max){
						this.maxDisabled = true;
					}
					if(newValue > this.max){
						newValue = this.max
					}
					if(newValue > this.min && this.minDisabled === true){
						this.minDisabled = false;
					}
				}
				if(newValue === value){
					return;
				}
				this.inputValue = newValue / scale;
			},
			_getDecimalScale() {
				let scale = 1;
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + '').split('.')[1].length);
				}
				return scale;
			},
			// 失去焦点时触发
			_onBlur(event) {
				let value = event.detail.value;
				if (!value) {
					this.inputValue = 0;
					return
				}
				value = +value;
				if (value > this.max) {
					value = this.max;
					this.maxDisabled = true
				} else if (value < this.min) {
					value = this.min
				}
				this.inputValue = value
				console.log(this.inputValue,value)
			},
			// 当键盘输入时触发
			_onInput(event){
				let value = event.detail.value;
				if (!value) {
					this.inputValue = 0;
					return
				}
				// 如果有小数点则替换为空
				if((value.toString()).indexOf(".") != -1){
					let checknum = (value.toString()).replace(/\./g,'');
					this.inputValue = Number(checknum)
				}
				// 如果输入第一个数字为0，默认为1
				if(value.toString().substr(0,1) === '0'){
					let checknum = (value.toString()).replace(/[\s\S]/g,'');
					this.inputValue = Number(checknum)
				}
				// 如果输入的数字大于最大值100，则把输入的数字替换为100
				if(value > this.max){
					let cutnum = (value.toString()).replace(/[\s\S]/g,'100');
					this.inputValue = Number(cutnum);
					this.maxDisabled = true
				}
				return this.inputValue
				// console.log(this.inputValue)
			},
		}
	}
</script>
<style>
	.uni-numbox {
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
		height: 50upx;
		position: relative;
		border:1px solid #C0C0C0;
		border-radius: 8upx;
	}
	.uni-numbox-minus,
	.uni-numbox-plus {
		margin: 0;
		background-color: #f8f8f8;
		width: 50upx;
		height: 50upx;
		font-size: 30upx;
		line-height: 50upx;
		text-align: center;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: #000;
		font-weight: bold;
		position: relative;
	}
	.uni-numbox-value {
		position: relative;
		width: 80upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		padding: 0;
		font-size: 30upx;
		border-left:1px solid #C0C0C0;
		border-right:1px solid #C0C0C0;
	}
	.uni-numbox-disabled {
		color: #c0c0c0;
		font-weight: normal;
	}
</style>
