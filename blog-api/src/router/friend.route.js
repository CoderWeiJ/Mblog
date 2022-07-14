const { friends } = require('../controller/friend.controller')
const Router = require('koa-router')
const router = new Router()


router.get('/friends', friends)
module.exports = router