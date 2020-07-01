import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: true,
		launchFlag:false,
		hasLogin: uni.getStorageSync('hasLogin') == undefined || uni.getStorageSync('hasLogin') == false ? false : true,//true--登录，false--未登录
		// userInfo: {},
		// user_id: ''
	},
	mutations: {
		login(state, userInfo) {
			state.hasLogin = true;
			// state.userInfo = userInfo;
			// state.user_id = userInfo.id;
			uni.setStorage({//将用户信息保存在本地
				key: 'hasLogin',
				data: state.hasLogin
			})
			// console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			// state.userInfo = {};
			// state.user_id = '';
			uni.setStorage({//将用户信息保存在本地
				key: 'hasLogin',
				data: state.hasLogin
			})
		},
		setOpenid(state, openid) {
			state.openid = openid
		}
	},
	actions: {}

})

export default store
