const { getMomentVOList, addLikeByMomentId } = require('../service/moment.service')
class MomentController {

  /**
   * 分页查询动态List
   * 
   * @param {Number} pageNum 页码
   * @param {String} jwt 博主访问Token，后续添加验证
   */
  getMomentVOList = async (ctx) => {
    const { pageNum = 1 } = ctx.request.query
    // token验证 TODO...
    try {
      //  分页查询
      const momentInfos = await getMomentVOList(pageNum)
      ctx.body = {
        success: true,
        message: '数据请求成功',
        result: momentInfos
      }
    } catch (error) {
      console.error('moment.controller.js [getMomentVOList] ', error)
      ctx.body = {
        success: false,
        message: '数据请求失败',
        result: null
      }
    }
  }

  // 给动态点赞
  like = async (ctx) => {
    const { id } = ctx.params
    try {
      await addLikeByMomentId(id)
      ctx.body = {
        success: true,
        message: '点赞成功'
      }
    } catch (error) {
      console.error('moment.controller.js [like] Error: ', error)
      ctx.body = {
        success: false,
        message: '点赞失败'
      }
    }
  }
}

module.exports = new MomentController()