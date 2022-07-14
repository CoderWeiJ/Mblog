const { about } = require('../controller/about.controller')
const Router = require('koa-router')
const router = new Router({
  prefix: '/about'
})

// 控制器
const { } = require('../controller/about.controller')
// 中间件
const { } = require('../middleware/about.middleware')

router.get('/', about)

module.exports = router