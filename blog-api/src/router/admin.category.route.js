const { getCategoryList, updateCategory, saveCategory, deleteCategory } = require('../controller/admin/category.admin.controller')

const Router = require('koa-router')
const router = new Router({
  prefix: '/admin/category'
})
// 获取分类列表
router.get('/', getCategoryList)

// 编辑分类
router.put('/', updateCategory)

// 添加新分类
router.post('/', saveCategory)
// 删除分类
router.delete('/', deleteCategory)
module.exports = router