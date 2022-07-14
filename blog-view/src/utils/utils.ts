
import moment from 'moment'

//设置moment国际化语言
moment.locale('zh-cn')

// 格式化时间
export function dateFormat(value: Date | string, format = 'YYYY-MM-DD HH:mm:ss'): Date | string | number {
  return moment(value).format(format)
}

export function dateFormatNow(value: Date | string): Date | string | number {
  //相对时间大于一个月，显示详细时间
  if (moment().diff(moment(value)) > 2592000000) {
    return moment(value).format('YYYY-MM-DD HH:mm')
  }
  return moment(value).fromNow()
}

export function checkEmail(rule:string, value:string, callback:Function) {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(reg.test(value)) return callback()
  callback(new Error('请输入合法的邮箱'))
}

export function checkUrl(rule:string, value:string, callback:Function) {
  const reg = /^(((ht)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/
  if(reg.test(value)) return callback()
  callback(new Error('请输入合法的 URL'))
}
