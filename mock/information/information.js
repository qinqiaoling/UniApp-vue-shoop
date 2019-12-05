// 引用mock.js 文件
import Mock from '../../common/mock.js'

// 模拟假数据
let mockdata = Mock.mock({
	"data|1-20": [{
		// 商品种类
		"goodsClass|1": ["女装","男装","童装","鞋子","袜子","帽子","行李箱"],
		// 商品Id
		"goodsId|+1": 1,
		//商品名称
		"goodsName": "@ctitle(10)",
		//商品图片
		"goodsImg": "@Image('100x100','@color','@cname')",
		// 中文 name
		"cname|1": "@cname",
		//img,参数1：背景色，参2：前景色，参3：图片的格式，默认png，参4：图片上的文字
		"img": "@image('100*100','@color')",
		//中文文本(句子)参1：句子的个数，参2：句子的最小个数  参3：句子的最大个数，没有参1时，参2参3才会生效
		"Ctext":"@cparagraph(1,1,3)",
		"endtime":"@datetime"
	}]
})
// 模拟请求
Mock.mock('/api/load','get',{
    "data|1-30": [{
    	// 商品Id
    	"Id|+1": 1,
    	//商品名称
    	"goodsName": "@ctitle(10)",
    	//商品图片
    	// 中文 name
    	"cname|1": "@cname",
    	//img,参数1：背景色，参2：前景色，参3：图片的格式，默认png，参4：图片上的文字
    	"img": "@Image('100*100','@color','@cfirst')",
		"goodsImg": "@Image('100x100','@color','小甜甜')",
    	//中文文本(句子)参1：句子的个数，参2：句子的最小个数  参3：句子的最大个数，没有参1时，参2参3才会生效
    	"Ctext":"@cparagraph(3,1,3)",
    	"endtime":"@date",
		"endcaretime":"@datetime"
    }]
})
// console.log(mockdata)
// 输出变量
export default{
	mockdata
}