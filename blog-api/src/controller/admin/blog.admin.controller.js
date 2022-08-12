const { getListByTitleAndCategoryId, deleteBlogTagByBlogId, deleteBlogById, updateBlogTopById, updateBlogRecommendById, updateBlogVisibilityById, getBlogById, saveBlog, saveBlogTag, updateBlog } = require('../../service/blog.service')
const { getCategoryList, getCategoryById, getCategoryByName, saveCategory } = require('../../service/category.service')
const { getTagById, getTagByName, saveTag, getTagList } = require('../../service/tag.service')
const { setTags } = require('../../utils/utils')
/**
 * @Description: 博客文章后台管理
 * @Author: CoderWeiJ
 * @Date: 2022-03-01
 */

class BlogAdminController {

  /**
   * 获取博客文章列表
   * 
   * @param {String} title 按标题模糊查询
   * @param {Number} categoryId 按分类id查询
   * @param {Number} pageNum 页码
   * @param {Number} pageSize 每页个数
   */
  blogs = async (ctx) => {
    const { title = '', category_id = '', pageNum = 1, pageSize = 10 } = ctx.request.query
    try {
      const { blogList, total } = await getListByTitleAndCategoryId(title, category_id, pageNum, pageSize)
      const { categoryList } = await getCategoryList()
      ctx.body = {
        success: true,
        message: '请求成功',
        result: { blogList, total, categoryList }
      }
    } catch (error) {
      console.error('blogAdmin.controller.js [blogs] Error: ', error)
      ctx.body = {
        success: false,
        message: '请求失败',
        result: null
      }
    }
  }

  deleteBlog = async (ctx) => {
    try {
      const { id } = ctx.request.params
      await deleteBlogTagByBlogId(id)
      await deleteBlogById(id)
      ctx.body = {
        success: true,
        message: '删除成功',
      }
    } catch (error) {
      console.error('blogAdmin.controller.js [deleteBlog] Error: ', error.message)
      ctx.body = {
        success: false,
        message: '删除失败',
      }
    }
  }



  /**
   * 更新博客置顶状态
   * 
   * @param {Number} id 博客id
   * @param {Boolean} top 置顶状态 
   */
  updateTop = async (ctx) => {
    const { id, top } = ctx.request.query
    try {
      await updateBlogTopById(id, top)
      ctx.body = {
        success: true,
        message: '置顶状态更新成功',
      }
    } catch (error) {
      console.error('blogAdmin.controller.js [updateTop] Error: ', error.message)
      ctx.body = {
        success: false,
        message: '置顶状态更新失败',
      }
    }
  }

  updateRecommend = async (ctx) => {
    const { id, recommend } = ctx.request.query
    try {
      await updateBlogRecommendById(id, recommend)
      ctx.body = {
        success: true,
        message: '推荐状态更新成功',
      }
    } catch (error) {
      console.error('blogAdmin.controller.js [updateRecommend] Error: ', error.message)
      ctx.body = {
        success: false,
        message: '推荐状态更新失败',
      }
    }

  }

  updateVisibility = async (ctx) => {
    const { id, form } = ctx.request.query
    try {
      await updateBlogVisibilityById(id, JSON.parse(form))
      ctx.body = {
        success: true,
        message: '更新成功',
      }
    } catch (error) {
      console.error('blogAdmin.controller.js [updateVisibility] Error: ', error.message)
      ctx.body = {
        success: false,
        message: '更新失败',
      }
    }
  }

  /**
   * 获取分类列表和标签列表
   * 
   * @returns
   */
  categoryAndTag = async (ctx) => {
    try {
      const { categoryList } = await getCategoryList()
      const { tagList } = await getTagList()
      ctx.body = {
        success: true,
        message: '请求成功',
        result: { categoryList, tagList }
      }
    } catch (error) {
      console.error('blogAdmin.controller.js [categoryAndTag] Error: ', error.message)
      ctx.body = {
        success: false,
        message: '请求失败',
        result: null
      }
    }
  }

  /**
   * 按id获取博客详情
   * @param {Number} id 博客id
   */
  getBlog = async (ctx) => {
    const { id } = ctx.request.query
    try {
      const res = await getBlogById(id)
      await setTags([res])
      ctx.body = {
        success: true,
        message: '请求成功',
        result: res
      }
    } catch (error) {
      console.error('blogAdmin.controller.js [getBlog] Error: ', error.message)
    }
  }

  /**
   * 保存草稿或发布新文章
   * 
   * @param {Object} blog 博客内容 
   */
  saveBlog = async (ctx) => {
    const blog = ctx.request.body
    try {
      const res = await this.getResult(blog, 'save')
      ctx.body = {
        success: true,
        message: res
      }
    } catch (error) {
      ctx.body = {
        success: false,
        message: error.message,
        result: null
      }
      console.error('blogAdmin.controller.js [saveBlog] Error: ', error.message)
    }
  }

  /**
   * 更新博客
   * 
   * @param {Object} blog 更新的博客内容 
   */
  updateBlog = async (ctx) => {
    const blog = ctx.request.body
    try {
      const res = await this.getResult(blog, 'update')
      ctx.body = {
        success: true,
        message: res
      }
    } catch (error) {
      ctx.body = {
        success: false,
        message: error.message
      }
    }

  }

  /**
   * 执行博客添加或更新操作：校验参数是否合法，添加分类、标签，维护博客标签关联表
   * @param {Object} blog 博客内容
   * @param {*} type 添加或更新
   */
  getResult = async (blog, type) => {
    // 验证普通字段
    for (let k in blog) {
      if (['read_time', 'views', 'password', 'category', 'tags', 'id'].includes(k)) continue // 跳过这两个字段的判断
      if ([null, undefined, ''].includes(blog[k]) || blog[k] < 0) {
        console.error(`${k}参数验证错误: `, blog[k])
        throw new Error(`${k}参数有误`)
      }
    }
    // 处理分类
    const cate = blog['category']
    if (!cate) throw new Error('分类不能为空')
    if (typeof cate === 'number') { // 选择了已存在的分类
      const r = await getCategoryById(cate) // 这里变成Object了
      r.length > 0 ? blog['category'] = r[0] : []
    } else if (typeof cate === 'string') {
      // 查询分类是否已存在
      const category = await getCategoryByName(cate)
      if (category.length > 0) throw new Error('不可添加已存在的分类')
      blog['category'] = await saveCategory({ category_name: cate }) // 保存新分类
    } else throw new Error('分类不正确')
    // 处理标签
    const tagList = blog['tagList']
    const tags = [] // 新建一个tag对象数组
    for (let t of tagList) {
      if (typeof t === 'number') { // 选择了已存在的标签
        const res = await getTagById(t)
        tags.push(...res)
      } else if (typeof t === 'string') {
        // 查询标签是否存在
        const res = await getTagByName(t)
        if (res) throw new Error('不可添加重复标签')
        await saveTag(t) // 保存新标签
        const result = await getTagByName(t)
        tags.push(result)
      } else throw new Error('标签不正确')
    }
    const date = Date.now()
    if (blog['read_time'] === null || blog['read_time'] < 0) {
      blog['read_time'] = Math.round(blog['words'] / 200) // 粗略计算阅读时长
    }
    if (blog['views'] === null || blog['views'] < 0) {
      blog['views'] = 0
    }
    // type的类型
    if ('save' === type) {
      blog['createdAt'] = date
      blog['updatedAt'] = date
      blog['user_id'] = 1 // 博客默认只有一个作者
      const result = await saveBlog(blog) // 返回插入的博客
      // 关联博客和标签(维护 blog_tag 表)
      for (let t of tags) {
        saveBlogTag(result['id'], t['id'])
      }
      return '添加成功'
    } else {
      blog['updatedAt'] = date
      await updateBlog(blog)
      // 关联博客和标签(维护blog_tag表)
      await deleteBlogTagByBlogId(blog['id'])
      tags.forEach(tag => {
        saveBlogTag(blog['id'], tag['id'])
      })
      return '更新成功'
    }
  }
}

module.exports = new BlogAdminController()