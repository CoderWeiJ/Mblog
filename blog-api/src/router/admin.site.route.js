const { getSiteSettings, updateAll } = require('../controller/admin/site.admin.controller')
const Router = require('koa-router')
const router = new Router({
  prefix: '/admin/site'
})

// 获取站点信息
router.get('/', getSiteSettings)
// 更新站点信息
router.put('/', updateAll)
module.exports = router