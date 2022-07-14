const { momentDao } = require('./mysql.service')
const { setMDToHTML, setNumToBoolean } = require('../utils/utils')
const pageSize = 5 // 每页显示5条动态
const PRIVATE_MOMENT_CONTENT = '<p>此条为私密动态，仅发布者可见！</p>'
class MomentService {

  /**
   * 分页查询动态List
   * 
   * @param {Number} pageNum 页码
   * @param {String} adminIdentity 身份标识
   * @returns 
   */
  getMomentVOList = async (pageNum, adminIdentity) => {
    const moments = await momentDao.getMomentList(pageNum, pageSize)
    setNumToBoolean(moments['moments'], 'list', ['is_published'])
    moments['moments'].forEach(moment => {
      if (moment.is_published) setMDToHTML(moment, 'blog')
    })    
    return moments
  }

  getMomentList = async (pageNum, pageSize) => {
    const moments = await momentDao.getMomentList(pageNum, pageSize)
    setNumToBoolean(moments['moments'], 'list', ['is_published'])
    return moments
  }

  getMomentById = async (id) => {
    return await momentDao.getMomentById(id)
  }

  saveMoment = async (moment) => {
    return await momentDao.saveMoment(moment)
  }

  updateMoment = async (moment) => {
    await momentDao.updateMoment(moment)
  }

  /**
   * 给动态点赞
   * 
   * @param {Number} id 
   */
  addLikeByMomentId = async (id) => {
    if (await momentDao.addLikeByMomentId(id) !== 1) throw '点赞失败'
  }

  updateMomentPublishedById = async (id, is_published) => {
    await momentDao.updateMomentPublishedById(id, is_published)
  }
}

module.exports = new MomentService()