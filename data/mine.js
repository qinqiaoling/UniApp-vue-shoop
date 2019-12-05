const userInfo = {
	username: '小明',
	avatar: '/static/mine/mzyun.png'
}
const walletInfo = [{
	number: 5,
	name: '优惠券',
	type:'discount'
}, {
	number: 34,
	name: '积分',
	type:'integral'
}, {
	number: 56,
	name: '零钱',
	type:'money'
}]
const nav = [{
	image: '/static/mine/order1.png',
	name: '全部订单',
	url:'/pages/order/order?index=0'
}, {
	image: '/static/mine/order2.png',
	name: '待付款',
	url:'/pages/order/order?index=1'
}, {
	image: '/static/mine/order3.png',
	name: '待收货',
	url:'/pages/order/order?index=2'
}, {
	image: '/static/mine/order4.png',
	name: '待评价',
	url:'/pages/order/order?index=3'
}, {
	image: '/static/mine/order5.png',
	name: '已完成',
	url:'/pages/order/order?index=4'
}]
const discount = [{
	price: '5',
	moneyoff:'满50元减5元',
	name: '未领取',
	type:'1',
	outtime:'2019-10-30'
}, {
	price: '10',
	moneyoff:'满70元减10元',
	name: '未领取',
	type:'1',
	outtime:'2019-11-30'
}, {
	price: '5',
	moneyoff:'满50元减5元',
	name: '已失效',
	type:'3',
	outtime:'2019-09-30'
}, {
	price: '3',
	moneyoff:'满10元减3元',
	name: '已领取',
	type:'2',
	outtime:'2019-10-30'
}, {
	price: '20',
	moneyoff:'满150元减20元',
	name: '未领取',
	type:'1',
	outtime:'2019-10-30'
}]
export default {
	userInfo,
	walletInfo,
	nav,
	discount
}
