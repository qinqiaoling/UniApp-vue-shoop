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
		//商品地址
		"goodsAddress": "@county(true)",
		//商品等级评价★
		"goodsStar|1-5": "★",
		//商品图片
		"goodsImg": "@Image('100x100','@color','小甜甜')",
		//商品售价
		"goodsSale|30-500": 30,
		// 邮箱：
		"email": "@email",
		// 颜色
		"color": "@color",
		// name
		"name": "@name",
		// 中文 name
		"cname|1": "@cname",
		//img,参数1：背景色，参2：前景色，参3：图片的格式，默认png，参4：图片上的文字
		"img": "@image('100*100','@color')",
		//英文文本(句子)参1：句子的个数，参2：句子的最小个数  参3：句子的最大个数，没有参1时，参2参3才会生效
		"Etext":"@paragraph(1,1,3)",
		//中文文本(句子)参1：句子的个数，参2：句子的最小个数  参3：句子的最大个数，没有参1时，参2参3才会生效
		"Ctext":"@cparagraph(1,1,3)",
		//中国大区
		"cregion":"@region",
		// 省
		"cprovince":"@province",
		//市
		"ccity":"@city",
		//省 + 市
		"ss":"@city(true)",
		//县
		"country":"@county",
		//省市县
		"countrysx":"@county(true)",
		//邮政编码
		"code":"@zip"
	}]
})

// 输出变量
export default{
	mockdata
}