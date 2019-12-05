<template>
	<view class="evaluate">
		<view class="evaluateflex">
			<image :src="shoopimg" mode="aspectFit" class="evshoopimg"></image>
			<view class="evshooptitle">{{shooptitle}}</view>
		</view>
		<view class="input-textarea">
			<textarea class="textaerav" placeholder="写下你的评论" :value="comment" :maxlength="maxlength" @blur="bindTextAreaBlur" @input="bindTextAreaInput"/>
			<view class="nowtextnum">{{nowlength}}/{{maxlength}}</view>
			<view class="upimg-video">
				<view class="defaultup">
					<view class="defaultupflex" v-for="(item,index) in defaultimgvdo" :key="index" @click="upfile(item.type)">
						<image :src="item.srcimg" class="defaultimg"></image>
						<view>{{item.text}}</view>
					</view>
				</view>
				<view class="realyimg" v-if="realyimhlist.length>0">
					<view class="realyimgflex" v-for="(item,index) in realyimhlist" :key="index">
						<view class="imgborder">
							<image :src="item" class="limitimg"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="sendcomment">
			<button type="primary" @click="commentfun">发表评价</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				shoopimg:'',
				shooptitle:'',
				comment:'',
				nowlength:0,
				maxlength:100,
				defaultimgvdo:[
					{
						srcimg:'/static/evaluate/upimg.png',
						text:'添加图片',
						type:'img'
					},
					{
						srcimg:'/static/evaluate/upvideo.png',
						text:'添加视频',
						type:'vedio'
					}
				],
				realyimhlist:[],
			}
		},
		onLoad(option) {
			this.shoopimg = JSON.parse(option.evalu).image
			this.shooptitle = JSON.parse(option.evalu).title
		},
		methods:{
			bindTextAreaBlur: function (e) {
				this.comment = e.detail.value
				console.log(e.detail.value)
			},
			bindTextAreaInput:function(e){
				let valleng = e.detail.value.length
				this.nowlength = valleng
				if(this.nowlength >= this.maxlength){
					uni.showToast({
						icon:"none",
						title:"最多输入"+this.maxlength+"个文字"
					})
				}
			},
			upfile(type){
				if(type == 'img'){
					uni.chooseImage({
					    success: (chooseImageRes) => {
					        const tempFilePaths = chooseImageRes.tempFilePaths;
					        // uni.uploadFile({
					        //     url: 'http://192.168.31.75:8080/', //仅为示例，非真实的接口地址
					        //     filePath: tempFilePaths[0],
					        //     name: 'file',
					        //     formData: {
					        //         'user': 'test'
					        //     },
					        //     success: (uploadFileRes) => {
					        //         console.log(uploadFileRes.data);
					        //     }
					        // });
							this.realyimhlist = tempFilePaths
							console.log(chooseImageRes,tempFilePaths)
					    }
					});
				}
			},
			commentfun(){
				uni.showToast({
					icon:"success",
					title:"发表成功"
				})
				this.comment = ""
				this.realyimhlist = []
			},
		}
	}
</script>

<style lang="scss">
	.evaluate{
		.evaluateflex{
			display: flex;
			align-items: center;
			padding: 10upx 20upx;
			border-bottom: 1px solid #efeff4;
			.evshoopimg{
				width: 100upx;
				height: 100upx;
				margin-right: 20upx;
			}
			.evshooptitle{
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 32upx;
			}
		}
		.input-textarea{
			padding: 20upx;
			.textaerav{
				width: 100%;
				height: 200upx;
			}
			.nowtextnum{
				text-align: right;
				font-size: 32upx;
				border-top: 1px solid #F1F1F1;
				padding: 10upx 0;
			}
			.upimg-video{
				.defaultup{
					display: flex;
					align-items: center;
					.defaultupflex{
						border:1px dashed #b5b5b5;
						color: #b5b5b5;
						font-size: 24upx;
						text-align: center;
						padding: 20upx;
						margin-right: 20upx;
						cursor: pointer;
						.defaultimg{
							width: 40upx;
							height: 40upx;
						}
					}
				}
				.realyimg{
					border-top: 1px solid #F1F1F1;
					border-bottom: 1px solid #F1F1F1;
					margin: 20upx 0;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					.realyimgflex{
						flex: 0 0 25%;
						text-align: center;
						.imgborder{
							margin: 10upx;
							border:1px solid #F1F1F1;
							.limitimg{
								width: 80upx;
								height: 80upx;
							}
						}
					}
				}
			}
		}
		.sendcomment{
			padding: 0 20upx;
			margin: 40upx 0;
		}
	}
</style>
