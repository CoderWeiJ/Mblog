const redisKeyConfig = require('../config/redisKey.config')
const { friendDao, siteDao } = require('./mysql.service')
const { getMapByValue, saveMapToValue, deleteCacheByKey } = require('./redis.service')
const { setMDToHTML } = require('../utils/utils')
/**
 * @Description: 友链业务层实现
 * @Author: CoderWeiJ
 * @Date: 2022-02-18
 */

class FriendService {

  /**
   * 查询友链List
   * @returns 
   */
  getFriendList = async (pageNum, pageSize) => {
    return await friendDao.getFriendList(pageNum, pageSize)
  }

  /**
   * 查询友链VO List
   * @returns
   */
  getFriendVOList = async () => {
    return await friendDao.getFriendVOList()
  }

  /**
   * 
   * @param {Number} friendId 
   * @param {Boolean} published 
   */
  updateFriendPublishedById = async (param) => {
    await friendDao.updateFriendPublishedById(param)
  }

  /**
   * 添加友链
   * @param {Object} friend 
   */
  saveFriend = async (friend) => {
    friend.views = 0
    friend.createdAt = new Date().getTime()
    await friendDao.saveFriend(friend)
  }

  /**
   * 更新友链
   * @param {Object} friend 
   */
  updateFriend = async (friend) => {
    await friendDao.updateFriend(friend)
  }

  /**
   * 按id删除友链
   * @param {Number} id 
   */
  deleteFriend = async (id) => {
    await friendDao.deleteFriend(id)
  }

  /**
   * 增加友链浏览次数
   * @param {String} nickname 
   */
  updateViewsByNickname = async (nickname) => {
    if (await friendDao.updateViewsByNickname(nickname) !== 1) throw '操作失败'
  }

  /**
   * 查询友链页面信息
   * @param {Boolean} cache 是否从redis拿缓存
   * @param {Boolean} md 是否是markdown
   * @returns {Object} 
   */
  getFriendInfo = async (cache, md) => {
    const key = redisKeyConfig.get('FRIEND_INFO_MAP')
    if (cache) {
      const friendInfoFromRedis = await getMapByValue(key)
      if (friendInfoFromRedis) return friendInfoFromRedis
    }
    // 数据库查询
    const siteSettings = await friendDao.getFriendInfo()
    const friendInfo = { content: '', commentEnabled: false }
    siteSettings.forEach(setting => {
      if (setting['name_en'] === 'friendContent') {
        !!md ? setMDToHTML(setting, 'about') : ''
        friendInfo['content'] = setting.value
      } else if (setting['name_en'] === 'friendCommentEnabled') {
        friendInfo['commentEnabled'] = setting['value'] === '1' ? true : false
      }
    })
    if (cache && md) saveMapToValue(key, friendInfo)
    return friendInfo
  }

  /**
   * 更新友链内容
   * @param {String} content 
   */
  updateFriendInfoContent = async (content) => {
    await siteDao.updateFriendInfoContent(content)
    this.deleteFriendInfoRedisCache()
  }

  /**
   * 更新友链评论开关
   * @param {Boolean} commentEnabled 
   */
  updateFriendInfoCommentEnabled = async (commentEnabled) => {
    if (await friendDao.updateFriendInfoCommentEnabled(commentEnabled) !== 1) throw '修改失败'
    this.deleteFriendInfoRedisCache()
  }

  /**
   * 删除友链页面缓存
   */
  deleteFriendInfoRedisCache = async () => {
    await deleteCacheByKey(redisKeyConfig.get('FRIEND_INFO_MAP'))
  }
}

module.exports = new FriendService()