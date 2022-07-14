import axios from 'axios'

// import NProgress from 'nprogress'; // 进度条
import 'nprogress/nprogress.css' //这个样式必须引入
import NProgress from 'nprogress'
const request = axios.create({
  baseURL: '自己的api接口',
  timeout: 3000,
})

// 请求拦截
request.interceptors.request.use((config: any) => {
  NProgress.start()
  const identification = window.localStorage.getItem('identification')
  // identification存在，且是基于baseURL的请求
  if (identification && !(config.url?.startsWith('http://') || config.url?.startsWith('https://'))) {
    config.headers.identification = identification
  }
  return config
})

// 响应拦截
request.interceptors.response.use(config => {
  NProgress.done()
  const identification = config.headers.identification
  if (identification) {
    //保存身份标识到localStorage
    window.localStorage.setItem('identification', identification)
  }
  return config.data
})

export default request
