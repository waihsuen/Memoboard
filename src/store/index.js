import Vuex from 'vuex'
import Vue from 'vue';
import memos from './modules/memos'

// LOAD VUEX
Vue.use(Vuex)

// Create Store

export default new Vuex.Store({
    modules: {
        memos
    }
})