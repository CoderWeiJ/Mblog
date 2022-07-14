const { getFriendInfo, getFriendList, updateFriend, updateFriendPublishedById, deleteFriend, saveFriend, updateFriendInfoContent } = require('../../service/friend.service')
/**
 * @Description: 友链页面后台管理
 * @Author: CoderWeiJ
 * @Date: 2022-03-11
 */
class FriendAdminController {

  /**
   * 获取友链页面信息
   * 
   * @return
   */
  getFriendInfo = async (ctx) => {
    try {
      const res = await getFriendInfo(false, false)
      ctx.body = {
        success: true,
        message: '请求成功',
        result: res
      }
    } catch (error) {
      console.error(`friend.admin.controller.js [getFriendInfo] Error: `, error.message)
      ctx.body = {
        success: false,
        message: '请求失败',
        reuslt: null
      }
    }
  }

  /**
   * 更新友链内容
   * 
   * @param {String} content 
   */
  updateFriendInfoContent = async (ctx) => {
    const { content } = ctx.request.body
    try {
      await updateFriendInfoContent(content)
      ctx.body = {
        success: true,
        message: '更新成功'
      }
    } catch (error) {
      console.error(`friend.admin.controller.js [updateFriendInfoContent] Error: `, error.message)
      ctx.body = {
        success: false,
        message: '更新失败'        
      }
    }
  }

  /**
   * 分页获取友链列表
   * 
   * @param {Nubmer} pageNum 页码
   * @param {Number} pageSize 每页显示多少行
   */
  getFriendList = async (ctx) => {
    const { pageNum = 1, pageSize = 10 } = ctx.request.body
    try {
      const res = await getFriendList(pageNum, pageSize)
      ctx.body = {
        success: true,
        message: '请求成功',
        result: res
      }
    } catch (error) {
      console.error(`friend.admin.controller.js [getFriendList] Error: `, error.message)
      ctx.body = {
        success: false,
        message: '请求失败',
        reuslt: null
      }
    }
  }


  /**
   * 更新友链
   * 
   * @param {Object} friend 友链内容 
   */
  updateFriend = async (ctx) => {
    try {
      const friend = ctx.request.body
      await updateFriend(friend)
      ctx.body = {
        success: true,
        message: '更新成功'
      }
    } catch (error) {
      console.error(`friend.admin.controller.js [updateFriend] Error: `, error.message)
      ctx.body = {
        success: false,
        message: '更新失败'
      }
    }

  }

  /**
   * 更新公开状态
   * 
   * @param {Number} id 友链id
   * @param {Boolean} is_published 状态  
   * 
   */
  updatePublished = async (ctx) => {
    const param = ctx.request.body
    try {
      await updateFriendPublishedById(param)
      ctx.body = {
        success: true,
        message: '更新成功'
      }
    } catch (error) {
      console.error(`friend.admin.controller.js [updatePublished] Error: `, error.message)
      ctx.body = {
        success: false,
        message: '更新失败'
      }
    }
  }

  /**
   * 
   * @param {Number} id 友链id
   */
  deleteFriend = async (ctx) => {
    const { id } = ctx.request.query
    try {
      await deleteFriend(id)
      ctx.body = {
        success: true,
        message: '删除成功'
      }
    } catch (error) {
      console.error(`friend.admin.controller.js [deleteFriend] Error: `, error.message)
      ctx.body = {
        success: false,
        message: '删除失败'
      }
    }
  }

  /**
   * 添加友链
   * 
   * @param {Object} friend 友链内容 
   */
  saveFriend = async (ctx) => {
    const friend = ctx.request.body
    try {
      await saveFriend(friend)
      ctx.body = {
        success: true,
        message: '添加成功'
      }
    } catch (error) {
      console.error(`friend.admin.controller.js [saveFriend] Error: `, error.message)
      ctx.body = {
        success: false,
        message: '添加失败'
      }
    }
  }
}

module.exports = new FriendAdminController()