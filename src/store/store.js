import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
    lectures: []
  },
  mutations: {
    title (state, title) {
      state.title = title
    }
  },
  actions: {
    // загрузить лекции
    loadLectures ({ state }) {
      if (!state.lectures.length) {
        Vue.http.get(process.env.API_HOST + 'lectures').then(response => {
          state.lectures = response.body
        })
      }
    }
  }
})
