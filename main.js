import Vue from 'vue'
import App from './App'
import store from './store'
import moment from 'moment'

import * as filters from './filters' // global filters

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store

Vue.prototype.$moment = moment

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue({
    ...App
})
app.$mount()
