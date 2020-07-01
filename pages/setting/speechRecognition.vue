<template>
	<div class="recording">
		<div class="recording-content">
			（此处放置语音识别结果）
		</div>
		<h6 class="recording-title">长按录音</h6>
		<!-- 此处可放置倒计时，可根据需要自行添加 -->
		<!-- <div class="recording-time"> 
			{{seconds}} : {{ms}}
		</div> -->
		<div class="recording-box">
			<canvas canvas-id="canvas" style="width:100px;height:100px;">
				<span class="recording-button" @touchstart="start" @touchmove="move" @touchend="end"></span>
			</canvas>
		</div>
	</div>
</template>

<!-- https://ext.dcloud.net.cn/plugin?id=301  摘录这个链接的c插件——长按录音交互  -->

<script>
	// const recorderManager = uni.getRecorderManager();
	import MD5 from '@/common/md5.js';
	export default {
		data() {
			return {
				max: 5000, // 录音最大时长，单位毫秒
				frame: 50, // 执行绘画的频率，单位毫秒
				longTag: false, // 判定长按和点击的标识
				maxTiming: false, // 最长录音时间的定时器
				draw: undefined,
				seconds: '00',
				ms: '00'
			}
		},
		onLoad() {
			console.log(1);

			// 录音结束的事件监听
			let self = this;
			/* recorderManager.onStop(function(res) {
				console.log('recorder stop' + JSON.stringify(res));
				self.voicePath = res.tempFilePath;
			}); */
		},
		onShow() {
			console.log(2);
		},
		onReady() {
			console.log(3);
		},
		onHide() {
			console.log(4);
		},
		onUnload() {
			console.log(5);
		},
		onPullDownRefresh() {
			console.log(6);
		},
		onReachBottom() {
			console.log(7);
		},
		onTabItemTap() {
			console.log(8);
		},
		onShareAppMessage() {
			console.log(9);
		},
		onPageScroll() {
			console.log(10);
		},
		onNavigationBarButtonTap() {
			console.log(11);
		},
		onBackPress() {
			console.log(12);
		},
		onNavigationBarSearchInputChanged() {
			console.log(13);
		},
		onNavigationBarSearchInputConfirmed() {
			console.log(14);
		},
		onNavigationBarSearchInputClicked() {
			console.log(15);
		},
		methods: {
			start: function() {
				this.longTag = setTimeout(this.recording, 500); // 定义超过500ms即为长按，可自行修改
			},
			move: function() {
				clearTimeout(this.longTag);
				clearTimeout(this.maxTiming);
				clearInterval(this.draw);
				this.longTag = false;
			},
			end: function() {
				clearTimeout(this.longTag);
				clearTimeout(this.maxTiming);
				clearInterval(this.draw);
				if (this.longTag) { // timeout不是false证明没有触发recording或者touchmove事件
					console.log('点击事件');
				}
				this.longTag = false;
				this.draw = false;

				// 语音转换
				this.send();
			},
			recording: function() {
				let self = this;

				// 开始录音
				this.longTag = false;
				// recorderManager.start();
				console.log('录音开始');

				// 最大录音时间10秒
				this.maxTiming = setTimeout(function() {
					clearInterval(this.draw);
					console.log('时间到');

					// 语音转换
					// self.send();
				}, self.max);

				// 录音过程圆圈动画
				let angle = -0.5;
				let context = uni.createCanvasContext('canvas');
				this.draw = setInterval(function() {
					context.beginPath();
					context.setStrokeStyle("#1296db");
					context.setLineWidth(3);
					context.arc(50, 50, 25, -0.5 * Math.PI, (angle += 2 / (self.max / self.frame)) * Math.PI, false);
					context.stroke();
					context.draw();
				}, self.frame);
			},
			send: function() {
				// recorderManager.stop();
				uni.showModal({
					title: '提示',
					content: '是否进行语音识别',
					confirmColor: '#1296DB',
					success: function(res) {
						if (res.confirm) {
							let appid = '5c9c2bdd';
							let time = parseInt((new Date()).getTime()/1000);
							let param = 'eyJlbmdpbmVfdHlwZSI6ICJzbXMxNmsiLCJhdWUiOiAicmF3In0=';
							let apikey = '13bed048d8395c06906fc816a3310402';
							let sum = apikey + time + 'eyJlbmdpbmVfdHlwZSI6ICJzbXMxNmsiLCJhdWUiOiAicmF3In0==';
							uni.request({
								url: 'https://api.xfyun.cn/v1/service/v1/iat?audio=eyJlbmdpbmVfdHlwZSI6ICJzbXMxNmsiLCJhdWUiOiAicmF3In0=',
								method: 'POST',
								header: {
									contentType: 'application/x-www-form-urlencoded;charset=utf-8',
									'X-Appid': appid,
									'X-CurTime': time,
									'X-Param': param,
									'X-CheckSum': sum,
								},
								data: {
									// engine_type: 'sms8k', // string 是 引擎类型， 可选值： sms16k（ 16 k采样率普通话音频）、 sms8k（ 8 k采样率普通话音频） 等 sms8k
									// aue: 'raw', // string 是 音频编码， 可选值： raw（ 未压缩的pcm或wav格式）、 speex（ speex格式）、 speex - wb（ 宽频speex格式） raw
									// speex_size: 60, // string 否 speex音频帧率， speex音频必传 60
									// scene: 'main', // string 否 情景模式。 如需使用热词功能， 必须指定scene = main。 main
									// vad_eos: 1800, // string 否 后端点检测（ 单位： ms）， 默认1800， 取值范围0 - 10000 2000
									audio: 'eyJlbmdpbmVfdHlwZSI6ICJzbXMxNmsiLCJhdWUiOiAicmF3In0=',
								},
								success: res => {
                                    console.log(res)
								},
								fail: (error) => {
                                    console.log(error)
								},
								complete: (complete) => {
                                    console.log(complete)
								}
							});
						} else if (res.cancel) {

						}
					}
				});
			},
			timing: function() {
				let self = this;

			},
			reset: function() {
				this.seconds = '00';
				this.ms = '00';
			}
		}
	}
</script>

<style scoped>
	.recording {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		background: #E7E7E7;
	}

	.recording-content {
		flex-grow: 1;
		padding: 10upx;
		font-size: 32upx;
		color: #1296DB;
		background: #fff;
	}

	.recording-title {
		padding: 20upx;
		text-align: center;
		font-size: 32upx;
		color: #1296DB;
	}

	.recording-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	#canvas {
		position: relative;
		width: 200upx;
		height: 200upx;
		z-index: 10;
	}

	.recording-button {
		position: absolute;
		box-sizing: border-box;
		top: 50upx;
		left: 50upx;
		display: inline-block;
		width: 100upx;
		height: 100upx;
		border: 1px dashed #1296DB;
		border-radius: 100upx;
		background: url(../../static/speech-recognition/recording.png) no-repeat 50% 50%;
		background-size: 50% 50%;
		z-index: 100;
	}

	.recording-time {
		text-align: center;
		font-size: 40upx;
		color: #1296db;
	}
</style>
