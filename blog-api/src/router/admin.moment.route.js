const { getMoments, updatePublished, getMoment, saveMoment, updateMoment } = require('../controller/admin/moment.admin.controller')

const Router = require('koa-router')
const router = new Router({
  prefix: '/admin'
})

// 获取动态列表
router.get('/moments', getMoments)
// 更新动态公开状态
router.put('/moment/published', updatePublished)
// 根据id查询动态
router.get('/moment', getMoment)

// 发布动态
router.post('/moment', saveMoment)
// 更新动态
router.put('/moment', updateMoment)
module.exports = router