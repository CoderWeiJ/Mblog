
const { getComments } = require('../controller/comment.controller')
const Router = require('koa-router')
const router = new Router({
  prefix: '/comments'
})

router.get('/', getComments)
module.exports = router
