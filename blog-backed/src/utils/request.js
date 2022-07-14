import axios from 'axios'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
  baseURL: '接口地址',
  timeout: 5000
})

const CancelToken = axios.CancelToken // 取消axios请求

/* 这里没有做token验证，所以注释掉了 */
// 请求拦截
// request.interceptors.request.use(config => {
//   // 对于访客模式，除GET请求外，都拦截并提示
//   const user = JSON.parse(window.localStorage.getItem('user') || '{}')
//   if (user !== 'admin' || (Object.keys(user).length > 0 && user.role !== 'ROLE_admin' && config.method !== 'get')) {
//     config.cancelToken = new CancelToken(function executor(cancel) {
//       cancel('演示模式，不允许操作')
//     })
//     return config
//   }

//   NProgress.start() // 进度条开始
//   const token = window.localStorage.getItem('token')
//   if (token) config.headers.Authorization = token // 请求带上token
//   return config
// }, error => {
//   console.error('请求拦截异常：', error)
//   return Promise.reject(error)
// })

// 响应拦截
// request.interceptors.response.use(res => {
//   NProgress.done()
//   if (!res.success) {
//     const msg = res.message || 'Error'
//     Message.error(msg)
//     return Promise.reject(new Error(msg))
//   }
//   return res
// }, error => {
//   console.log('响应拦截异常: ', error)
//   Message.error(error.message)
//   return Promise.reject(error)
// })

export default request
