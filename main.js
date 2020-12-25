import Vue from 'vue'
import App from './App'

import * as filters from './filters' // global filters

Vue.config.productionTip = false

App.mpType = 'app'

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue({
    ...App
})
app.$mount()
