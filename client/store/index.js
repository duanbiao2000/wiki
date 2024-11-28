import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify' // eslint-disable-line import/no-duplicates
import { make } from 'vuex-pathify' // eslint-disable-line import/no-duplicates

import page from './page'
import site from './site'
import user from './user'

/* global WIKI */

Vue.use(Vuex)

// 定义Vuex的state
const state = {
  loadingStack: [], // 加载栈
  notification: {
    message: '', // 通知消息
    style: 'primary', // 通知样式
    icon: 'cached', // 通知图标
    isActive: false // 通知是否激活
  }
}

// 导出Vuex的Store
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 是否开启严格模式
  plugins: [
    pathify.plugin
  ],
  state,
  getters: {
    isLoading: state => { return state.loadingStack.length > 0 } // 判断是否正在加载
  },
  mutations: {
    ...make.mutations(state), // 使用vuex-pathify插件生成mutations
    loadingStart (st, stackName) {
      st.loadingStack = _.union(st.loadingStack, [stackName]) // 开始加载，将stackName添加到loadingStack中
    },
    loadingStop (st, stackName) {
      st.loadingStack = _.without(st.loadingStack, stackName) // 停止加载，将stackName从loadingStack中移除
    },
    showNotification (st, opts) {
      st.notification = _.defaults(opts, {
        message: '',
        style: 'primary',
        icon: 'cached',
        isActive: true
      }) // 显示通知，将opts中的属性添加到notification中
    },
    updateNotificationState (st, newState) {
      st.notification.isActive = newState // 更新通知状态
    },
    pushGraphError (st, err) {
      WIKI.$store.commit('showNotification', {
        style: 'red',
        message: _.get(err, 'graphQLErrors[0].message', err.message),
        icon: 'alert'
      }) // 推送Graph错误，显示通知
    }
  },
  actions: { },
  modules: {
    page,
    site,
    user
  }
})
