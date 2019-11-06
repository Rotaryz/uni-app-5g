import Vue from 'vue'
import App from './App'
import 'utils/http-handler'

import API from './api/index'
import './design/variable.styl'
Vue.config.productionTip = false
Vue.prototype.API = API
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
console.warn(process.env.VUE_APP_ENV, VERSION)

