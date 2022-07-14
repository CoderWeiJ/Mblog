
import moment from 'moment'

/**
 * 通过生成DOM节点来复制内容至剪贴板
 *
 * @param {String} copyContent 需要复制的内容
 */
export function copy(copyContent) {
  const oInput = document.createElement('input')
  oInput.value = copyContent
  document.body.appendChild(oInput)
  oInput.select()
  document.execCommand('Copy')
  oInput.remove()
}

/**
 *
 * @param {Date} value 日期
 * @param {String} format 时间格式
 * @returns
 */
export function dateFormat(value, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(value).format(format)
}

/**
 * 防抖 单位时间只触发最后一次
 * 例: <el-button v-debounce="[reset, 'click', 300]">刷新</el-button>
 * 简写: <el-button v-debounce="[reset]">刷新</el-button>
 *
 * @param {HTMLElement} el DOM节点
 * @param {Object} binding 参数
 */
export function debounce(el, binding) {
  const [fn, event = 'click', time = 300] = binding.value
  let timer
  el.addEventListener(event, () => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => fn(), time)
  })
}

/**
 * 节流 每单位时间内触发一次
 * 例：<el-button v-throttle="[reset, 'click', 300]">刷新</el-button>
 * 传递参数: <el-button v-throttle="[() => reset(param), 'click', 300]">刷新</el-button>
 * @param {HTMLElement} el DOM节点
 * @param {Object}} binding 参数
 */
export function throttle(el, binding) {
  const [fn, event = 'click', time = 300] = binding.value
  let now, preTime
  el.addEventListener(event, () => {
    now = new Date()
    if (!preTime || now - preTime > time) {
      preTime = now
      fn()
    }
  })
}

/**
 * 产生随机uuid
 *
 * @returns
 */
export function randomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// ====================================正则校验=============================================

export function checkEmail(rule, value, callback) {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (reg.test(value)) return callback()
  callback(new Error('请输入合法的邮箱'))
}

export function checkIpv4(rule, value, callback) {
  const reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  if (reg.test(reg)) return callback()
  callback(new Error('请输入合法的 ipv4 地址'))
}

export function checkIpv6(rule, value, callback) {
  const reg = /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i
  if (reg.test(value)) return callback()
  callback(new Error('请输入合法的 ipv6 地址'))
}

export function checkNumber(rule, value, callback) {
  const reg = /^\d{1,}$/
  if (reg.test(value)) return callback()
  callback(new Error('请输入纯数字'))
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isImgExt(fileName) {
  return /\.(apng|avif|bmp|gif|ico|cur|jpg|jpeg|jfif|pjpeg|pjp|png|svg|tif|tiff|webp)$/i.test(fileName)
}
