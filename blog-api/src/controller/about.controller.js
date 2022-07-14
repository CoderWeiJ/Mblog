const { getAboutInfo } = require('../service/about.service')

class AboutController {
  // 获取关于我内容
  about = async (ctx) => {
    try {
      const res = await getAboutInfo()
      ctx.body = {
        success: true,
        message: '数据请求成功',
        result: res
      }
    } catch (error) {
      console.error('about.controller.js [getAboutInfo] ', error)
      ctx.body = {
        success: false,
        message: '数据请求失败',
        result: null
      }
    }
  }
}

module.exports = new AboutController()