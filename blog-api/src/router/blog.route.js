
const { getBlogByIdAndIsPublished, getBlogInfoListByIsPublished } = require('../controller/blog.controller')
const Router = require('koa-router')
const router = new Router()


router.get('/blog', getBlogByIdAndIsPublished) // 根据id获取博客
router.get('/blogs', getBlogInfoListByIsPublished) // 获取公开博客列表

module.exports = router