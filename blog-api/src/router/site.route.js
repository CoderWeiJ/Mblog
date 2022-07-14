const Router = require('koa-router')
const { getSite } = require('../controller/site.controller')
const router = new Router({
  prefix: '/site'
})

router.get('/', getSite)

module.exports = router