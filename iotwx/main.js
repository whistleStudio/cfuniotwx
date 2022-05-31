import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

import uView from "uview-ui"
Vue.use(uView)
uni.$u.config.unit = 'rpx'

Vue.prototype.$reqPost = function ({url,body,rsv=()=>{},rej=()=>{}}) {
  uni.request({
  	url,
  	method: "POST",
  	header:  {
  		'Content-Type': 'application/json;charset=utf-8'
  	},
  	data: body,
  	success (res) {
  		rsv(res)
  	},
  	fail (err) {
			rej(err)
  	}
	})
}	

// #ifdef H5
var baseUrl = '/api'
// #endif

// #ifndef H5
var baseUrl = "http://localhost:8082" 
// #endif
Vue.prototype.$baseUrl = baseUrl

const app = new Vue({
    ...App
})
app.$mount()
// #endif





