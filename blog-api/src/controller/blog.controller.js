// service
const blogService = require('../service/blog.service')
const { setTags } = require('../utils/utils')
/**
 * @Description: 博客相关
 * @Author: CoderWeiJ
 * @Date: 2022-01-04
 */

class BlogController {

  async getBlogById(id) {

  }

  /**
   * 按置顶、创建时间排序 分页查询博客简要信息列表
   *
   * @param pageNum 页码
   * @return
   */
  async getBlogInfoListByIsPublished(ctx) {
    const { pageNum } = ctx.request.query
    try {
      const res = await blogService.getBlogInfoListByIsPublished(pageNum)
      console.log(res)
      await setTags(res['blogList'])
      return ctx.body = {
        success: true,
        message: '博客简要信息列表请求成功',
        result: res
      }
    } catch (error) {
      console.log('getBlogs: ', error)
      ctx.body = {
        success: false,
        message: '博客简要信息列表请求失败',
        result: null
      }
    }
  }

  /**
   * 按id获取公开博客详情
   * @param {上下文} ctx 
   * @returns 
   */
  async getBlogByIdAndIsPublished(ctx) {
    const { id } = ctx.request.query
    try {
      const blogInfo = await blogService.getBlogByIdAndIsPublished(id)
      // 因为setTags处理的是数组，所以手动给一个数组
      await setTags([blogInfo])
      ctx.body = {
        success: true,
        message: '博客信息请求成功',
        result: blogInfo
      }
      return
    } catch (error) {
      ctx.body = {
        success: false,
        message: '博客信息请求失败',
        result: null
      }
      console.error('error: ', error)
    }
  }
}

module.exports = new BlogController()