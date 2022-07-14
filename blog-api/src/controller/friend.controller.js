
const { getFriendVOList, getFriendInfo, updateViewsByNickname } = require('../service/friend.service')

/**
 * @Description: 友链
 * @Author: CoderWeiJ
 * @Date: 2020-02-23
 */

class FriendController {

  // 获取友链页面
  friends = async (ctx) => {
    try {
      const friendList = await getFriendVOList() // 友链List
      const friendInfo = await getFriendInfo(true, true) // 设置里的友链信息
      ctx.body = {
        success: true,
        message: '友链数据请求成功',
        result: { friendList, friendInfo }
      }
    } catch (error) {
      console.error('friend.controller.js [获取友链页面]: ', error)
      ctx.body = {
        success: false,
        message: '友链数据请求失败',
        result: null
      }
    }
  }

  // 按昵称增加友链浏览次数
  friend = async (ctx) => {
    const { nickname } = ctx.params
    try {
      await updateViewsByNickname(nickname)
      ctx.body = {
        success: true,
        message: '浏览次数+1',
        result: null
      }
    } catch (error) {
      console.error('friend.controller.js [增加浏览次数]: ', error)
      ctx.body = {
        success: false,
        message: '浏览次数增加失败',
        result: null
      }
    }
  }


}

module.exports = new FriendController()