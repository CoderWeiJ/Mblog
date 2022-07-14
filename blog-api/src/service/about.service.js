const About = require('../model/about.model')
const redisKeyConfig = require('../config/redisKey.config')
const { getMapByValue, saveMapToValue, deleteCacheByKey } = require('./redis.service')
const { aboutDao } = require('./mysql.service')
const { setMDToHTML } = require('../utils/utils')
/**
 * @Description: 关于我页面业务层实现
 * @Author: CoderWeiJ
 * @Date: 2022-02-17
 */
class AboutService {

  /**
   * 查询关于我页面评论开关状态
   * @returns 
   */
  getAboutInfo = async () => {
    const key = redisKeyConfig.get('ABOUT_INFO_MAP')
    const aboutInfoFromRedis = await getMapByValue(key)
    if (aboutInfoFromRedis) return aboutInfoFromRedis
    // 数据库查询
    const abouts = await aboutDao.getList()
    const _abouts = {} // 只要value
    abouts.forEach(about => {
      if (about['name_en'] === 'content') setMDToHTML(about, 'about')
      _abouts[about.name_en] = about.value
    })
    await saveMapToValue(key, _abouts) // 保存到redis
    return _abouts
  }

  /**
   * 关于我
   * @returns 
   */
  getAboutSetting = async () => {
    const abouts = await aboutDao.getList()
    const _about = {}
    abouts.forEach(about => _about[about['name_en']] = about['value'])    
    return _about
  }

  /**
   * 更新关于我
   * @param {Object} about
   */
  updateAbout = async (about) => {
    for (let key in about) {
      await this.updateOneAbout(key, about[key])
    }
    this.deleteAboutRedisCache()
  }

  /**
   * 单独更新一项
   * @param {String} name_en 
   * @param {String} value 
   */
  updateOneAbout = async (name_en, value) => {
    await aboutDao.updateAbout(name_en, value)
  }
  /**
   * 查询关于我页面评论开关状态
   */
  getAboutCommentEnabled = async () => {
    return await aboutDao.getAboutCommentEnabled()

  }

  /**
   * 删除关于我页面缓存
   */
  deleteAboutRedisCache = async () => {
    deleteCacheByKey(redisKeyConfig.get('ABOUT_INFO_MAP'))
  }
}


module.exports = new AboutService()