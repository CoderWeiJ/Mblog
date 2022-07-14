const Router = require('koa-router')
const router = new Router()
const { getMomentVOList, like } = require('../controller/moment.controller')

// 获取动态List
router.get('/moments', getMomentVOList)

// 点赞
router.post('/moment/like/:id', like)

module.exports = router