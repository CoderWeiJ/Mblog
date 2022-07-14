const { getList, updateSiteSetting } = require("../../service/site.service")

/**
 * @Description: 站点设置后台管理
 * @Author: CoderWeiJ
 * @Date: 2020-03-11
 */


class SiteAdminController {

  /**
   * 获取所欲站点配置信息
   * 
   * @returns
   */
  getSiteSettings = async (ctx) => {
    try {
      const res = await getList()
      ctx.body = {
        success: true,
        message: '请求成功',
        result: res
      }
    } catch (error) {
      console.error('site.admin.controller.js [getSiteSettings] Error: ', error.message)
      ctx.body = {
        success: false,
        message: '请求失败',
        result: null
      }
    }
  }

  /**
   * 修改、删除(部分配置可为空，但不可删除)、添加(只能添加部分)站点配置
   * 
   * @param {Array} settings 更新后的所有配置
   * @param {Array} deleteIds 要删除的配置id
   * @returns
   */
  updateAll = async (ctx) => {
    const { settings, deleteIds } = ctx.request.body
    console.log('打印参数: ', settings, deleteIds)
    try {
      await updateSiteSetting(settings, deleteIds)
      ctx.body = {
        success: true,
        message: '更新成功'
      }
    } catch (error) {
      console.error('site.admin.controller.js [updateAll] Error: ', error.message)
      ctx.body = {
        success: false,
        message: '更新失败'
      }
    }
  }
}

module.exports = new SiteAdminController()