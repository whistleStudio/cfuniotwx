import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

import uView from "uview-ui"
Vue.use(uView)
uni.$u.config.unit = 'rpx'

const app = new Vue({
    ...App
})
app.$mount()
// #endif





