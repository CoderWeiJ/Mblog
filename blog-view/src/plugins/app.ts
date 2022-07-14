import { createApp } from 'vue'
import App from '../App.vue'
import router from '../router'
import store from '../store'
// 引入自定义css
import '@a/css/base.css'
// 引入阿里icon
import '@a/css/icon/iconfont.css'
// 引入typo.css
import '@a/css/typo.css'
// 引入semantic0ui
import 'semantic-ui-css/semantic.min.css'
// 引入 element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElMessage, ElNotification } from 'element-plus'
// 引入v-viewer
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

// 引入utils
import { dateFormat, dateFormatNow } from '@/utils/utils'
// 创建app
const app = createApp(App)

const cubic = (value: number) => Math.pow(value, 3)
const easeInOutCubic = (value: number) => (value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2)

// 注册全局变量
app.config.globalProperties.$msgTip = (msg: string, type: any) => {
  ElMessage({ type, center: true, message: msg, duration: 1500 })
}
app.config.globalProperties.$notify = (title: string, message: string, type: '' | 'info' | 'success' | 'warning' | 'error') => {
  ElNotification({ title, message, type })
}
// 滚动至页面顶部，使用 element-ui 回到顶部 组件中的算法
// 相当于 vue2 的Vue.prototype.scrollToTop
app.config.globalProperties.scrollToTop = function () {
  const el = document.documentElement
  const beginTime = Date.now()
  const beginValue = el.scrollTop
  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
  function frameFunc(): void {
    const progress = (Date.now() - beginTime) / 500
    if (progress < 1) {
      el.scrollTop = beginValue * (1 - easeInOutCubic(progress))
      rAF(frameFunc)
    } else {
      el.scrollTop = 0
    }
  }
  rAF(frameFunc)
}
// 管道过滤，vue2的filters
app.config.globalProperties.$filters = {
  dateFormat,
  dateFormatNow,
}
// 屏蔽错误信息
app.config.errorHandler = () => null
// 屏蔽警告信息
app.config.warnHandler = () => null
app.use(VueViewer).use(ElementPlus).use(store).use(router)

export default app
