const { getAbout, updateAbout } = require('../controller/admin/about.admin.controller')

const Router = require('koa-router')
const router = new Router({
  prefix: '/admin/about'
})
// 获取关于我
router.get('/', getAbout)
// 更新关于我
router.put('/', updateAbout)
module.exports = router