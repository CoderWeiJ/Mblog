const app = require('./app/index.js')
const { APP_PORT } = require('./config/default.config.js')
// const { hasKey } = require('./service/redis.service')
// async function a() {
//   let result = await hasKey('blog')
//   console.log('结果：', result);
// }
// a()
app.listen(APP_PORT, () => {
  console.log(`服务器启动，监听${APP_PORT}...`)
})




