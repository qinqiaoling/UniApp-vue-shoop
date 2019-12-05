import Vue from 'vue'
import App from './App'
import store from './store'
import util from './common/util.js'
import Mock from './common/mock.js'

Vue.prototype.$root=util.root
Vue.prototype.$get=util.get
Vue.prototype.$prePage=util.prePage
Vue.prototype.$msg=util.msg
Vue.prototype.$jump=util.jump
Vue.prototype.$isLogin=util.isLogin
Vue.prototype.$store=store
Vue.prototype.$mock=Mock

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
