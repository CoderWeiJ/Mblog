const { getList, getSiteInfo } = require('../service/site.service')
const { getNewBlogListByIsPublished, getRandomBlogListByLimitNumAndIsPublishedAndIsRecommend } = require('../service/blog.service')
const { getCategoryList } = require('../service/category.service')
const { getTagListNotId } = require('../service/tag.service')

/**
 * @Description: 站点相关
 * @Author: CoderWeiJ
 * @Date: 2022-02-14
 */

class SiteController {

  /**
   * 获取站点配置信息、最新推荐博客、分类列表、标签云、随机博客
   */
  getSite = async (ctx) => {
    try {
      const map = await getSiteInfo() // 站点配置信息
      map['newBlogList'] = await getNewBlogListByIsPublished() // 最新公开博客
      const { categoryList } = await getCategoryList() // 分类列表
      map['categoryList'] = categoryList
      map['tagList'] = await getTagListNotId() // 标签列表
      map['randomBlogList'] = await getRandomBlogListByLimitNumAndIsPublishedAndIsRecommend() // 随机博客     
      ctx.body = {
        success: true,
        message: '站点信息请求成功',
        result: map
      }
    } catch (error) {
      console.error('site.controller.js [getSite]异常：', error)
      ctx.body = {
        success: false,
        message: '站点信息请求失败',
        result: null
      }
    }
  }
}

module.exports = new SiteController()