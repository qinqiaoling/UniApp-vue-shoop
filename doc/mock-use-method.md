Mock 使用方法
============

### 1,引用mock.js  -------- import Mock from '../../common/mock.js'
### 2,定义mock 的模拟'假数据'
### 3,Mock.mock('/api/load','get',{'假数据'})
	/api/load'---请求地址,这里填写的地址可以是任意不存在的地址
	'get'----请求方式
	'{假数据}'
### 4,在需要请求的页面引用模拟假数据的 js 文件 ------ import mockindex from '@/mock/index/index.js'
### 5,Mock和request 数据互通,请求地址要和Mock.mock 的请求接口地址一样,包括请求方式
	例子：
	uni.request({
		url:'/api/load',
		method:'GET',
		success: (res) => {
			console.log('这里就可以得到mock 模拟的假数据了')
			console.log(res)
		}
	})

# 需要全局使用Mock :
	1,在main.js 页面引用mock.js;定义属性 Vue.prototype.$mock=Mock
	2,在页面直接 this.$mock.mock() 使用mock 方法


