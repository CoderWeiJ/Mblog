/**
 * 任务队列，按时间间隔执行函数
 * 例：taskQueue(() => {console.log(123)}, 1000)
 */

const queue = []
let timer = null
function process() {
  if (queue.length === 0) {
    clearInterval(timer)
    timer = null
    return
  }
  const fn = queue.shift()
  fn()
  if (queue.length === 0) {
    clearInterval(timer)
    timer = null
  }
}

// 仅第一个任务的timeout有效
export function taskQueue(fn, timeout) {
  queue.push(fn)
  if (!timer) {
    process()
    timer = setInterval(process, timeout)
  }
}
