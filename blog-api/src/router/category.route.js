
const { getBlogList } = require('../controller/category.controller')
const Router = require('koa-router')
const router = new Router({
  prefix: '/category'
})

router.get('/', getBlogList)

module.exports = router
