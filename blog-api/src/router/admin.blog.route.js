

const { getBlog, blogs, deleteBlog, updateTop, updateRecommend, updateVisibility, categoryAndTag, saveBlog, updateBlog } = require('../controller/admin/blog.admin.controller')
const Router = require('koa-router')
const router = new Router({
  prefix: '/admin'
})

// 获取博客列表
router.get('/blogs', blogs)

// 获取博客详情
router.get('/blog', getBlog)
// 更新博客
router.put('/blog', updateBlog)
// 发布博客
router.post('/blog', saveBlog)

// 删除博客
router.delete('/blog/:id', deleteBlog)

// 设置置顶
router.put('/blog/top', updateTop)

// 设置推荐
router.put('/blog/recommend', updateRecommend)

// 设置可见性
router.put('/blog/visibility', updateVisibility)

// 获取分类和标签
router.get('/categoryAndTag', categoryAndTag)



module.exports = router