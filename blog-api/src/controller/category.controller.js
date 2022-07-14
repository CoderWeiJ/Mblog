const { getBlogInfoListByCategoryNameAndIsPublished } = require('../service/blog.service')
/**
 * @Description: 分类
 * @Author: CoderWeiJ
 * @Date: 2022-02-16
 */


class CategoryController {

  /**
   * 根据分类name分页查询公开博客列表
   * @param {Object} ctx 
   * @returns 
   */
  getBlogList = async (ctx) => {
    // 分类name
    // 页码
    const { categoryName, pageNum = 1 } = ctx.request.query
    try {
      const res = await getBlogInfoListByCategoryNameAndIsPublished(categoryName, pageNum)
      ctx.body = {
        success: true,
        message: '数据获取成功',
        result: res
      }
    } catch (error) {
      console.error('category.controller.js [getBlogList]异常：', error)
      ctx.body = {
        success: false,
        message: '数据获取失败',
        result: null
      }
    }
  }
}

module.exports = new CategoryController()