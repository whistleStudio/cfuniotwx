import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
	state:{//存放状态
		token: "",
		_username: "",
		_curIdx: 0,
		_devList: [],
		_btnState: [],
		_ranState: [],
		_dataState: []
	},
	mutations: {
		resetData (state) {
			state._devList.forEach(e => {
				state._btnState.push(Array(4).fill(0))
				state._ranState.push(Array(4).fill(0))
				state._dataState.push(Array(8).fill(0))
			})
		},
		changeVal (state, {k, v}) {
			state[k] = v
		},
		changeArrVal (state, {k, v, idx}) {
			Vue.set(state[k][idx[0]], idx[1], v)
		}
	}
})

export default store