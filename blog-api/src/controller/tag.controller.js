const { setTags } = require('../utils/utils')
const { getBlogInfoListByTagNameAndIsPublished } = require('../service/blog.service')
/**
 * @Description: 标签
 * @Author: CoderWeiJ
 * @Date: 2020-02-17
 */
class TagController {

  /**
   * 根据标签name分页查询公开博客列表
   * @param {上下文} ctx
   */
  getBlogInfoListByTagNameAndIsPublished = async (ctx) => {
    const { tagName, pageNum = 1 } = ctx.request.query
    try {
      const res = await getBlogInfoListByTagNameAndIsPublished(tagName, pageNum)
      await setTags(res.blogList)
      ctx.body = {
        success: true,
        message: '博客列表请求成功',
        result: res
      }
    } catch (error) {
      console.error('tagController [getBlogInfoListByTagNameAndIsPublished]: ', error)
      ctx.body = {
        success: false,
        message: '博客列表请求失败',
        result: null
      }
    }
  }
}

module.exports = new TagController()