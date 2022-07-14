const { getMomentList, updateMomentPublishedById, getMomentById, saveMoment, updateMoment } = require("../../service/moment.service")


/**
 * @Description: 博客动态后台管理
 * @Author: CoderWeiJ
 * @Date: 2020-03-09
 */
class MomentAdminController {

  /**
   * 获取动态列表
   * 
   * @param {Number} pageNum 页码
   * @param {Number} pageSize 每页条数
   */
  getMoments = async (ctx) => {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    try {
      const res = await getMomentList(pageNum, pageSize)
      ctx.body = {
        success: true,
        message: '请求成功',
        result: res
      }
    } catch (error) {
      console.error('moment.admin.controller.js [getMoments] Error: ', error.message)
      ctx.body = {
        success: false,
        message: '请求失败',
        result: null
      }
    }
  }

  /**
   * 
   * @param {Number} id 动态id
   * @param {Boolean} is_published 公开状态 
   */
  updatePublished = async (ctx) => {
    const { id, is_published } = ctx.request.body
    try {
      await updateMomentPublishedById(id, is_published)
      ctx.body = {
        success: true,
        message: '更新成功'
      }
    } catch (error) {
      console.error('moment.admin.controller [updatePublished] Error: ', error.message)
      ctx.body = {
        success: false,
        message: '更新失败'
      }
    }
  }

  /**
   * 根据id查询动态
   * 
   * @param {Number} id 动态id
   */
  getMoment = async (ctx) => {
    const { id } = ctx.request.query
    try {
      const res = await getMomentById(id)
      ctx.body = {
        success: true,
        message: '请求成功',
        result: res
      }
    } catch (error) {
      console.error('moment.admin.controller.js [getMoment] Error: ', error.message)
      ctx.body = {
        success: false,
        message: '请求失败',
        result: null
      }
    }
  }

  /**
   * 
   * @param {Object} moment 动态内容 
   */
  saveMoment = async (ctx) => {
    const moment = ctx.request.body
    if(!moment['createdAt']) moment['createdAt'] = new Date()
    try {
      await saveMoment(moment)
      ctx.body = {
        success: true,
        message: '保存成功'
      }
    } catch (error) {
      console.error('moment.admin.controller.js [saveMoment] Error: ', error.message)
      ctx.body = {
        success: false,
        message: '保存失败'
      }
    }
  }

  updateMoment = async (ctx) => {
    const moment = ctx.request.body
    if(!moment['createdAt']) moment['createdAt'] = new Date()
    try {
      await updateMoment(moment)
      ctx.body = {
        success: true,
        message: '更新成功'
      }
    } catch (error) {
      ctx.body = {
        success: false,
        message: '更新失败'
      }
      console.error('moment.admin.controller.js [updateMoment] Error: ', error.message)
    }
  }
}

module.exports = new MomentAdminController()