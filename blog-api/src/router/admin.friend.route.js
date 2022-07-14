const { getFriendInfo, updateFriendInfoContent, getFriendList, saveFriend, deleteFriend, updateFriend, updatePublished } = require('../controller/admin/friend.admin.controller')

const Router = require('koa-router')
const router = new Router({
  prefix: '/admin'
})

// 获取友链评论信息
router.get('/friendInfo', getFriendInfo)
// 更新友链评论内容
router.put('/friendInfo/content', updateFriendInfoContent)
// 获取友链列表
router.get('/friends', getFriendList)
// 更新友链
router.put('/friend', updateFriend)
// 更新友链公开状态
router.put('/friend/published', updatePublished)
// 通过id删除友链
router.delete('/friend', deleteFriend)
// 添加友链
router.post('/friend', saveFriend)
module.exports = router