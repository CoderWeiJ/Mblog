import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// global css
import '@a/styles/index.scss'
// icon
import '@/icons'
// directive filter
import { debounce, throttle, dateFormat } from '@/utils/utils'
// mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// v-viewer
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.directive('debounce', { inserted: debounce })
Vue.directive('throttle', { inserted: throttle })
Vue.filter('dateFormat', dateFormat)

Vue
  .use(mavonEditor)
  .use(ElementUI)
  .use(Viewer)

Vue.prototype.$msg = function (msg, type) {
  this.$message({
    message: msg,
    type,
    center: true,
    duration: 1500
  })
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
