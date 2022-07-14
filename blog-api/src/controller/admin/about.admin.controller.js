
/**
 * @Description: 关于我页面后台管理
 * @Author: CoderWeiJ
 * @Date: 2022-03-10
 */

const { getAboutSetting, updateAbout } = require("../../service/about.service")

class AboutAdminController {

  /**
   * 获取关于我页面配置
   * 
   * 
   */
  getAbout = async (ctx) => {
    try {
      const res = await getAboutSetting()
      ctx.body = {
        success: true,
        message: '请求成功',
        result: res
      }
    } catch (error) {
      ctx.body = {
        success: false,
        message: '请求失败',
        result: null
      }
    }
  }

  updateAbout = async (ctx) => {
    const about = ctx.request.body
    try {
      await updateAbout(about)
      ctx.body = {
        success: true,
        message: '更新成功'
      }
    } catch (error) {
      console.error('about.admin.controller.js [updateAbout] Error: ', error.message)
      ctx.body = {
        success: false,
        message: '更新失败'
      }
    }
  }
}

module.exports = new AboutAdminController()