import app from '@/plugins/app'

/**
 * 防抖 单位时间只触发最后一次
 * 例：<el-button v-debounce="[reset,`click`,300]">刷新</el-button>
 * 简写：<el-button v-debounce="[reset]">刷新</el-button>
 */
const debounceDirect: Object | Function | void = {
  inserted(el: Document, binding: any): Object | Function | void {
    const [fn, event = "click", time = 300] = binding.value
    let timer: number
    el.addEventListener(event, () => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => fn(), time)
    })
  }
}
/**
 * 节流 每单位时间可触发一次
 * 例：<el-button v-throttle="[reset,`click`,300]">刷新</el-button>
 * 传递参数：<el-button v-throttle="[()=>reset(param),`click`,300]">刷新</el-button>
 */
const throttleDirect: Object | Function | void = {
  inserted(el: Document, binding: any) {
    const [fn, event = "click", time = 300] = binding.value
    let now: Date, preTime: Date
    el.addEventListener(event, () => {
      now = new Date()
      if (!preTime || now.valueOf() - preTime.valueOf() > time) {
        preTime = now
        fn()
      }
    })
  }
}
app.directive('debounce',debounceDirect)
app.directive('throttle', throttleDirect)

