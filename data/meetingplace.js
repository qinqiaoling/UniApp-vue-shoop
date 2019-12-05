const typeList = [{
	title: "潮牌会场",
	id:0,
}, {
	title: "新人专区",
	id:1,
}, {
	title: "最in频道",
	id:2,
}, {
	title: "限购满减",
	id:3,
}, {
	title: "全球热卖",
	id:4,
}, {
	title: "大牌精选",
	id:5,
}, {
	title: "新特卖",
	id:6,
}]
// 为你推荐
const subTypeList0 = [{
	title: "运动鞋",
	//商品类别名称
	image: "/static/type/hot/find2.png",
	//商品类别图片
	id: "1",
	//跳转地址	
	specialprice: '￥196',
	originprice: '原价￥418',
}, {
	title: "连衣裙",
	image: "/static/type/hot/find3.png",
	id: "2",
	specialprice: '￥296',
	originprice: '原价￥518',
}, {
	title: "超短裤",
	image: "/static/type/hot/find7.png",
	id: "3",
	specialprice: '￥96',
	originprice: '原价￥418',
}, {
	title: "女士休闲装",
	image: "/static/type/hot/find8.png",
	id: "4",
	specialprice: '￥196',
	originprice: '原价￥418',
}, {
	title: "护理彩妆",
	image: "/static/type/hot/love3.png",
	id: "5",
	specialprice: '￥196',
	originprice: '原价￥418',
}, {
	title: "男装",
	image: "/static/type/hot/nanz3.jpg",
	id: "6",
	specialprice: '￥196',
	originprice: '原价￥418',
}, {
	title: "墨镜",
	image: "/static/type/hot/next5.png",
	id: "7",
	specialprice: '￥196',
	originprice: '原价￥418',
}]
// 墨镜
const subTypeList1 = [{
	title: "防蓝光眼镜",
	//商品类别名称
	image: "/static/type/mojing/moj1.jpg",
	//商品类别图片
	id: "1",
	//跳转地址	
}, {
	title: "防辐射眼镜",
	image: "/static/type/mojing/moj2.jpg",
	id: "2"
}, {
	title: "防雾防风镜",
	image: "/static/type/mojing/moj3.jpg",
	id: "3"
}, {
	title: "偏光镜",
	image: "/static/type/mojing/moj4.png",
	id: "4"
}, {
	title: "墨镜",
	image: "/static/type/mojing/moj5.jpg",
	id: "5"
}, {
	title: "太阳镜",
	image: "/static/type/mojing/moj7.jpg",
	id: "6"
}, {
	title: "防紫外线镜",
	image: "/static/type/mojing/moj9.jpg",
	id: "7"
}, {
	title: "复古太阳镜",
	image: "/static/type/mojing/next1.png",
	id: "8"
}, {
	title: "感光变色眼镜",
	image: "/static/type/mojing/next5.png",
	id: "9"
}]
// 男装
const subTypeList2 = [{
	title: "小西服",
	//商品类别名称
	image: "/static/type/nanzhuang/nanz1.jpg",
	//商品类别图片
	id: "1",
	//跳转地址	
}, {
	title: "男衬衣",
	image: "/static/type/nanzhuang/nanz2.jpg",
	id: "2"
}, {
	title: "休闲男装",
	image: "/static/type/nanzhuang/nanz3.jpg",
	id: "3"
}, {
	title: "西装",
	image: "/static/type/nanzhuang/nanz4.jpg",
	id: "4"
}, {
	title: "西装",
	image: "/static/type/nanzhuang/nanz2.jpg",
	id: "5"
}, {
	title: "西装",
	image: "/static/type/nanzhuang/nanz1.jpg",
	id: "6"
}, {
	title: "西装",
	image: "/static/type/nanzhuang/nanz3.jpg",
	id: "7"
}]
// 男女内衣
const subTypeList3 = [{
	title: "男女保暖内衣",
	//商品类别名称
	image: "/static/type/nannvneiyi/ny1.jpg",
	//商品类别图片
	id: "1",
	//跳转地址	
}, {
	title: "男女背心",
	image: "/static/type/nannvneiyi/ny2.jpg",
	id: "2"
}, {
	title: "男装内衣",
	image: "/static/type/nannvneiyi/ny3.jpg",
	id: "3"
}, {
	title: "女装内衣",
	image: "/static/type/nannvneiyi/ny4.jpg",
	id: "4"
}, {
	title: "男女背心",
	image: "/static/type/nannvneiyi/ny2.jpg",
	id: "5"
}, {
	title: "女装内衣",
	image: "/static/type/nannvneiyi/ny4.jpg",
	id: "6"
}, {
	title: "男女背心",
	image: "/static/type/nannvneiyi/ny2.jpg",
	id: "7"
}]
// 女鞋
const subTypeList4 = [{
	title: "凉鞋",
	//商品类别名称
	image: "/static/type/nvxie/find1.png",
	//商品类别图片
	id: "1",
	//跳转地址	
}, {
	title: "运动鞋",
	image: "/static/type/nvxie/find2.png",
	id: "2"
}, {
	title: "尖头鞋",
	image: "/static/type/nvxie/find4.png",
	id: "3"
}, {
	title: "人字拖",
	image: "/static/type/nvxie/find5.png",
	id: "4"
}, {
	title: "运动鞋",
	image: "/static/type/nvxie/find2.png",
	id: "5"
}, {
	title: "尖头鞋",
	image: "/static/type/nvxie/find4.png",
	id: "6"
}, {
	title: "人字拖",
	image: "/static/type/nvxie/find5.png",
	id: "7"
}]
// 男鞋
const subTypeList5 = [{
	title: "球鞋",
	//商品类别名称
	image: "/static/type/nanxie/nanx1.jpg",
	//商品类别图片
	id: "1",
	//跳转地址	
}, {
	title: "马丁鞋",
	image: "/static/type/nanxie/nanx2.jpg",
	id: "2"
}, {
	title: "休闲鞋",
	image: "/static/type/nanxie/nanx3.jpg",
	id: "3"
}, {
	title: "皮鞋",
	image: "/static/type/nanxie/nanx4.jpg",
	id: "4"
}, {
	title: "马丁鞋",
	image: "/static/type/nanxie/nanx2.jpg",
	id: "5"
}, {
	title: "休闲鞋",
	image: "/static/type/nanxie/nanx3.jpg",
	id: "6"
}, {
	title: "皮鞋",
	image: "/static/type/nanxie/nanx4.jpg",
	id: "7"
}]
// 箱包皮鞋
const subTypeList6 = [{
	title: "旅行箱",
	//商品类别名称
	image: "/static/type/pakepagpx/xb1.jpg",
	//商品类别图片
	id: "1",
	//跳转地址	
}, {
	title: "皮鞋",
	image: "/static/type/pakepagpx/xb2.jpg",
	id: "2"
}, {
	title: "面膜",
	image: "/static/type/hfcz/love4.png",
	id: "3"
}, {
	title: "护肤品",
	image: "/static/type/hfcz/love5.png",
	id: "4"
}, {
	title: "商务手表",
	image: "/static/type/handwatchps/hwatch2.jpg",
	id: "5"
}, {
	title: "指甲剪套装",
	image: "/static/type/siginlehl/sigilehl2.jpg",
	id: "6"
},{
	title: "沐浴露套装",
	image: "/static/type/siginlehl/sigilehl1.jpg",
	id: "7",
}]
// 手表配饰
const subTypeList7 = [{
	title: "机械手表",
	//商品类别名称
	image: "/static/type/handwatchps/hwatch1.jpg",
	//商品类别图片
	id: "1",
	//跳转地址	
}, {
	title: "商务手表",
	image: "/static/type/handwatchps/hwatch2.jpg",
	id: "2"
}]
// 护肤彩妆
const subTypeList8 = [{
	title: "护肤彩妆",
	//商品类别名称
	image: "/static/type/hfcz/love3.png",
	//商品类别图片
	id: "1",
	//跳转地址	
}, {
	title: "面膜",
	image: "/static/type/hfcz/love4.png",
	id: "2"
}, {
	title: "护肤品",
	image: "/static/type/hfcz/love5.png",
	id: "2"
}]
// 个人护理
const subTypeList9 = [{
	title: "沐浴露套装",
	//商品类别名称
	image: "/static/type/siginlehl/sigilehl1.jpg",
	//商品类别图片
	id: "1",
	//跳转地址	
}, {
	title: "指甲剪套装",
	image: "/static/type/siginlehl/sigilehl2.jpg",
	id: "2"
}]
// 母婴
const subTypeList10 = [{
	title: "玩游戏",
	//商品类别名称
	image: "/static/type/muying/my1.jpg",
	//商品类别图片
	id: "1",
	//跳转地址	
}, {
	title: "绘画",
	image: "/static/type/muying/my2.jpg",
	id: "2"
}]
// 女装
const subTypeList11 = [{
	title: "连衣裙",
	//商品类别名称
	image: "/static/type/nvzhuang/find3.png",
	//商品类别图片
	id: "1",
	//跳转地址	
}, {
	title: "超短裤",
	image: "/static/type/nvzhuang/find7.png",
	id: "2"
}]
// 把各类商品集合在一个数组
let subTypeList = []
subTypeList.push(subTypeList0,subTypeList1,subTypeList2,subTypeList3,subTypeList4,subTypeList5,subTypeList6,subTypeList7,subTypeList8,subTypeList9,subTypeList10,subTypeList11)
export default{
	typeList,
	subTypeList,
}