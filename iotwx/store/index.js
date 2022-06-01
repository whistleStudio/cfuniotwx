import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
	state:{//存放状态
		token: ""
	},
	mutations: {
		changeVal (state, {k, v}) {
			state[k] = v
		}
	}
})

export default store