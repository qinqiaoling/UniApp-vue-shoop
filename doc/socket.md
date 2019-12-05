socket连接
======================

### socket是服务器主动向客户端推送数据的，这样可以做到即时通讯以达到客户端和服务端的数据统一；一般http协议是客户端主动向服务端发送请求并对返回的数据做处理，来让客户端数和服务端数据的统一；
	// socket 连接地址是以ws://+ip+':'+端口,而小程序连接是以wss://+ip+':'+端口
	uni.connectSocket({
	  url: 'ws://192.168.10.201:1234/'
	});//创建连接
	uni.onSocketOpen(function (res) {
	  console.log('WebSocket连接已打开！');
	});//打开连接
	uni.onSocketError(function (res) {
	  console.log('WebSocket连接打开失败，请检查！');
	});//连接失败
==========================================================	
	
	

# 运行自定义基座

### 1，在根目录下创建一个文件夹，名为 nativeplugins
### 2, 把原生插件包放在nativeplugins文件夹下
### 3，在原生插件包里编辑package.json
	+ {
	"name": "Breo",
	"id": "Chen-Breo",
	"version": "0.0.1",
	"description": "原生工具类",
	"_dp_type":"nativeplugin",
	"_dp_nativeplugin":{
		"android": {
			"plugins": [
				{
					"type": "module",
					"name": "Chen-Breo",
					"class": "com.chen.chenqcplus.BreoMudole"
				}
			],
			"integrateType": "aar",
			"minSdkVersion" : 16
		}
	}
}
[](https://blog.csdn.net/qwe749082787/article/details/89447431)
原文链接：https://blog.csdn.net/qwe749082787/article/details/89447431
### 4，配置插件，点开manifest.json，在APP原生插件配置里选择本地插件
### 5，选择自定义基座，HBuilderX工具栏中的“运行->运行到手机或模拟器->运行基座选择->自定义调试基座”后再次运行项目，即可通过自定义调试基座查看日志。
### 6，生成自定义基座，HBuilderX工具栏中的"运行"->"运行到手机或模拟器"->"制作自定义基座"，这样来生成我们包含插件的自定义基座，生成完毕后我们可以在unpackage目录下生成android_debug.apk，这时，我们的自定义基座就制作完毕，可以调试了。