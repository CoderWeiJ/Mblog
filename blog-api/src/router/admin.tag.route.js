const { getTags, saveTag, updateTag, deleteTag } = require('../controller/admin/tag.admin.controller')

const Router = require('koa-router')
const router = new Router({
  prefix: '/admin/tag'
})

// 获取标签列表
router.get('/', getTags)

// 编辑标签
router.put('/', updateTag)
// 添加新标签
router.post('/', saveTag)
// 删除标签
router.delete('/', deleteTag)
module.exports = router