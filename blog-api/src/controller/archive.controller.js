
/**
 * @Description: 归档页面
 * @Author: CoderWeiJ
 * @Date: 2020-02-21
 */

const { CITEXT } = require("sequelize/dist")
const { getArchiveBlogAndCountByIsPublished } = require("../service/blog.service")

class ArchiveController {

  /**
   * 按年月份归档公开博客 统计公开博客总数
   * 
   * @returns
   */
  getArchiveBlogAndCountByIsPublished = async (ctx) => {
    try {
      const res = await getArchiveBlogAndCountByIsPublished()
      ctx.body = {
        success: true,
        message: '数据请求成功',
        result: res
      }
    } catch (error) {
      ctx.body = {
        success: true,
        message: '数据请求失败',
        result: null
      }
      console.error('归档数据请求失败: ', error)
    }

  }
}

module.exports = new ArchiveController()