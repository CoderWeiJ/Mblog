const Router = require('koa-router')
const router = new Router({
  prefix: '/archives'
})

const { getArchiveBlogAndCountByIsPublished } = require('../controller/archive.controller')


router.get('/', getArchiveBlogAndCountByIsPublished)

module.exports = router