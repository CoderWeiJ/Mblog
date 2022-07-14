
const { getBlogInfoListByTagNameAndIsPublished } = require('../controller/tag.controller')
const Router = require('koa-router')
const router = new Router({
  prefix: '/tag'
})

router.get('/', getBlogInfoListByTagNameAndIsPublished)

module.exports = router