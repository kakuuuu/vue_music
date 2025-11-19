import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    myplaylist: {},
    currentsong: {},
    musicurl: ''
  },
  mutations: {
    changelist(state, playlist) {
      state.myplaylist = playlist
    },
    changesong(state, song) {
      state.currentsong = song
    },
    changemusicurl(state, url) {
      state.musicurl = url
    }
  }
})
export default store
