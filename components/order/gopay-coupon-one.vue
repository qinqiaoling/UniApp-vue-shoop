<template>
	<view class="gocoupon">
		<uni-popup class="gocoupon" :show="coupuptype === 'typecoupup'" position="bottom" @hidePopup="togglePopup('')">
			<view v-if="couponone==1">
				<view class="bottom-title">
					<view @click="togglePopup('')">X</view>
					<view>确认付款</view>
					<view class="question">
						<image src="/static/order/question.png" class="questionpic"></image>
					</view>
				</view>
				<view class="bottom-content">
					<view class="price">￥{{couponvalue}}</view>
					<view class="accoutinfo">
						<view>支付宝账户</view>
						<view>{{aliaccoutv}}</view>
					</view>
					<view class="accoutinfo" @click="gotwo()">
						<view>付款方式</view>
						<view class="right-arrow">{{banktext}}</view>
					</view>
					<view class="immediatelypay" @click="gothree()">立即付款</view>
				</view>
			</view>
			<view v-if="couponone==2">
				<view class="bottom-title">
					<view @click="goone()">
						<image src="/static/order/left-arrow.png" class="left-arrow"></image>
					</view>
					<view>选择付款方式</view>
					<view class="question">
						<image src="/static/order/question.png" class="questionpic"></image>
					</view>
				</view>
				<view class="bottom-content">
					<view class="discountwarp">
						<view class="bank"
							:class="index === selectbankon ? 'on bank'+index : 'bank'+index"
							@click="selectbank(item,index)"
							v-for="(item,index) in bank" 
							:key="index">
							{{item.text}}
							<text v-if="index==0" class="recommend">推荐</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="couponone==3">
				<view class="bottom-title">
					<view @click="goone()">
						<image src="/static/order/left-arrow.png" class="left-arrow"></image>
					</view>
					<view>请输入支付密码</view>
					<view class="question"></view>
				</view>
				<view class="bottom-content">
					<view class="discountwarp">
						<view class="inputpw">
							<valid-code ref="validcode" :maxlength="6" :isPwd="true" @finish="getPwd"></valid-code>
						</view>
					</view>
					<view class="grid">
						<view 
							class="gridflex"
							v-for="(item,index) in pwarr"
							@click="dotnum(item,index)"
							:key="index">
							{{item.num}}
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/common/uni-popup/uni-popup.vue"
	import validCode from "@/components/common/validCode/validCode.vue"
	export default {
		name: 'good-coupon',
		components:{uniPopup,validCode},
		props: {},
		data(){
			return{
				coupuptype:'',
				couponvalue:'',
				couponone:1,
				aliaccout:'15623456789',
				selectbankon:0,
				banktext:'花呗',
				pwarr:[
					{num:"1"},
					{num:"2"},
					{num:"3"},
					{num:"4"},
					{num:"5"},
					{num:"6"},
					{num:"7"},
					{num:"8"},
					{num:"9"},
					{num:""},
					{num:"0"},
					{num:"x"},
				],
				bank:[
					{text:'花呗'},
					{text:'招商银行储蓄卡（8943）'},
					{text:'中国银行储蓄卡（8765）'},
					{text:'中国农业银行储蓄卡（9876）'},
					{text:'中国建设银行储蓄卡（6754）'},
					{text:'交通银行储蓄卡（5678）'},
					{text:'余额宝(剩余：122222222.00)'},
				],
				dotlist:[],
				prentindex:{},
			}
		},
		computed:{
			aliaccoutv(){
				let user = this.aliaccout.split("")
				let cuser = []
				user.map((item,index)=>{
					if(index>2&&index<9){
						item = "*"
					}
					cuser.push(item)
				})
				// console.log(cuser)
				let juser = cuser.join('')
				return juser
			}
		},
		mounted() {
			this.$nextTick(function(){})
		},
		methods:{
			init(item){
				this.couponvalue = Number(item.money*item.amount).toFixed(2)
				this.prentindex = item
			},
			togglePopup(type) {
				this.coupuptype = type;
				this.selectbankon = 0
				this.dotlist = []
				this.couponone = 1
				this.banktext = this.bank[0].text
			},
			goone(){
				this.couponone = 1
			},
			gotwo(){
				this.couponone = 2
			},
			gothree(){
				this.couponone = 3
				this.dotlist = []
			},
			selectbank(val,index){
				this.selectbankon = index
				this.banktext = val.text
			},
			dotnum(val,index){
				if(index === 9){
					return false
				}else if(index === 11){
					if(this.dotlist.length>0){
						let dotlistlen = this.dotlist.length-1
						this.dotlist.splice(dotlistlen,1)
					}
				}else{
					if(this.dotlist.length<6){
						this.dotlist.push(val.num)
					}
				}
				let code={detail:this.dotlist.join("")}
				this.$refs.validcode.getsendVal(this.dotlist)
				console.log(this.dotlist,this.dotlist.length,code)
			},
			getPwd(val){
				console.log(val);
				this.togglePopup('')
				uni.showLoading({
				    title: '支付中'
				});
				let _this = this
				setTimeout(function () {
				    uni.hideLoading();
					_this.$emit('reparent',_this.prentindex)
				}, 3000);
			}
		}
	}
</script>

<style lang="scss">
	.gocoupon{
		.bottom-title{
			font-size: 32upx;
			border-bottom: 2upx solid #e6dfdf;
			padding: 0 20upx;
			text-align: left;
			line-height: 80upx;
			display: flex;
			justify-content: space-between;
			.question{
				width: 40upx;
				.questionpic{
					width: 40upx;
					height: 40upx;
					vertical-align: text-top;
				}
			}
			.left-arrow{
				width: 40upx;
				height: 40upx;
				vertical-align: text-top;
			}
		}
		.bottom-content{
			overflow-y: auto;
			height: 600upx;
			line-height: 1 !important;
			.price{
				font-size: 60upx;
				padding: 30upx 0;
			}
		}
		.accoutinfo{
			display: flex;
			justify-content: space-between;
			padding: 20upx 0;
			margin: 0 20upx;
			font-size: 28upx;
			color: #666666;
			border-bottom: 1px solid #e5e5e5;
			.right-arrow{
				background: url(../../static/arrow.png) no-repeat right center;
				background-size: 16upx 28upx;
				padding-right: 30upx;
			}
		}
		.immediatelypay{
			margin: 0 20upx;
			background: #007AFF;
			color: #FFFFFF;
			font-size: 32upx;
			text-align: center;
			border-radius: 8upx;
			height: 76upx;
			line-height: 76upx;
			position: absolute;
			bottom: 20upx;
			left: 0;
			right: 0;
		}
		.discountwarp{
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 20upx;
			.inputpw{
				flex: 0 0 100%;
				padding: 40upx 0;
			}
			.bank{
				flex: 0 0 100%;
				height: 80upx;
				line-height: 80upx;
				text-align: left;
				padding: 0 60upx;
				font-size: 32upx;
				border-bottom: 1px solid #e6dfdf;
				position: relative;
				&.on:after{
					display: block;
					content: "";
					position: absolute;
					right: 0;
					top: 0;
					width: 40upx;
					height: 80upx;
					background: url(../../static/order/sure.png) no-repeat right center;
					background-size: 40upx 40upx;
				}
				&:last-child{
					border-bottom:none;
				}
				.recommend{
					color: #FFFFFF;
					background: #30a793;
					font-size: 24upx;
					margin-left: 20upx;
					border-radius: 4upx;
					padding: 2upx 10upx;
				}
				&.bank0{
					background: url(../../static/order/bank/HB.png) no-repeat left center;
					background-size: 40upx 40upx;
				}
				&.bank1{
					background: url(../../static/order/bank/CMBC.png) no-repeat left center;
					background-size: 40upx 40upx;
				}
				&.bank2{
					background: url(../../static/order/bank/BC.png) no-repeat left center;
					background-size: 40upx 40upx;
				}
				&.bank3{
					background: url(../../static/order/bank/ABC.png) no-repeat left center;
					background-size: 40upx 40upx;
				}
				&.bank4{
					background: url(../../static/order/bank/CCB.png) no-repeat left center;
					background-size: 40upx 40upx;
				}
				&.bank5{
					background: url(../../static/order/bank/CTB.png) no-repeat left center;
					background-size: 40upx 40upx;
				}
				&.bank6{
					background: url(../../static/order/bank/YEB.png) no-repeat left center;
					background-size: 40upx 40upx;
				}
			}
		}
		.grid{
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			background: #e3e7ee;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			height: 400upx;
			.gridflex{
				flex: 0 0 33.33%;
				border-top: 1px solid #E5E5E5;
				border-right: 1px solid #E5E5E5;
				box-sizing: border-box;
				background: #FFFFFF;
				color: #333333;
				height: 100upx;
				line-height:100upx;
				cursor: pointer;
				&:nth-last-child(3){
					pointer-events: none;
					cursor: none;
					background-color: #e3e7ee;
				}
				&:last-child{
					background-color: #e3e7ee;
				}
			}
		}
	}
</style>
