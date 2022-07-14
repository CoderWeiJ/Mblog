const redisKeyConfig = require('../config/redisKey.config')
const { siteDao } = require('./mysql.service')
const { getMapByValue, saveMapToValue, deleteCacheByKey } = require('./redis.service')
/**
 * @Description: 站点设置业务层实现
 * @Author: CoderWeiJ
 * @Date: 2022-02-14
 */
const PATTERN = /\".*?\"/g

class SiteService {

  /**
   * 查询站点设置
   */
  getList = async () => {
    const res = await siteDao.getList()
    const map = {}
    const type1 = [], type2 = [], type3 = []
    res.forEach(item => {
      switch (item.type) {
        case 1: type1.push(item); break
        case 2: type2.push(item); break
        case 3: type3.push(item); break
      }
    })
    map['type1'] = type1
    map['type2'] = type2
    map['type3'] = type3
    return map
  }

  /**
   * 站点信息
   * @returns 
   */
  getSiteInfo = async () => {
    const key = redisKeyConfig.get('SITE_INFO_MAP')
    const siteInfoFromRedis = await getMapByValue(key)
    if (siteInfoFromRedis) return siteInfoFromRedis
    // redis没有，从数据库查
    const siteSettings = await siteDao.getList()
    // console.log('siteSettings: ', siteSettings);
    const map = {}
    const siteInfo = {}
    const badges = [] // 徽标
    const introduction = {} // 个人信息
    const favorites = [] // 爱好
    const rollTexts = [] // 个性签名
    siteSettings.forEach(item => {
      switch (item.type) {
        case 1: {
          // 将json转为js对象
          if ('copyright' === item.name_en) siteInfo[item.name_en] = JSON.parse(item.value)
          else siteInfo[item.name_en] = item.value
          break
        }
        case 2: {
          item.value = JSON.parse(item.value)
          badges.push(item.value)
          break
        }
        case 3: {
          if ('avatar' === item.name_en) introduction['avatar'] = item.value
          else if ('name' === item.name_en) introduction['name'] = item.value
          else if ('github' === item.name_en) introduction['github'] = item.value
          else if ('qq' === item.name_en) introduction['qq'] = item.value
          else if ('bilibili' === item.name_en) introduction['bilibili'] = item.value
          else if ('netease' === item.name_en) introduction['netease'] = item.value
          else if ('email' === item.name_en) introduction['email'] = item.value
          else if ('favorite' === item.name_en) favorites.push(JSON.parse(item.value))
          else if ('rollText' === item.name_en) {
            const res = item.value.match(PATTERN) // 去除双引号
            res.forEach(item => {
              rollTexts.push(JSON.parse(item))
            })
          }
          break
        }
      }
    })
    introduction['favorites'] = favorites
    introduction['rollText'] = rollTexts
    map['introduction'] = introduction
    map['siteInfo'] = siteInfo
    map['badges'] = badges
    saveMapToValue(key, map) // 保存到redis    
    return map
  }

  /**
   * 查询网页标题后缀
   * @returns 
   */
  getWebTitleSuffix = async () => {
    return await siteDao.getWebTitleSuffix()
  }

  /**
   * 更新友链信息
   * @param {Array} siteSettings 
   * @param {Array} deleteIds 
   */
  updateSiteSetting = async (siteSettings, deleteIds) => {
    deleteIds.forEach(id => {
      this.deleteOneSiteSettingById(id)
    })
    siteSettings.forEach(async siteSetting => {
      if (!['', null, undefined].includes(siteSetting.id)) await this.updateOneSiteSetting(siteSetting)
      else await this.saveOneSiteSetting(siteSetting)
    })
    this.deleteSiteInfoRedisCache()
  }

  /**
   * 添加一条友链
   * @param {Object} siteSetting 
   */
  saveOneSiteSetting = async (siteSetting) => {
    if (await siteDao.saveSiteSetting(siteSetting) !== 1) throw new Error('配置添加失败')
  }

  /**
   * 更新友链
   * @param {Object} siteSetting 
   */
  updateOneSiteSetting = async (siteSetting) => {
    await siteDao.updateSiteSetting(siteSetting)
  }

  /**
   * 删除友链
   * @param {Number} id 
   */
  deleteOneSiteSettingById = async (id) => {
    await siteDao.deleteSiteSettingById(id)
  }

  /**
   * 删除站点信息缓存
   */
  deleteSiteInfoRedisCache = async () => {
    await deleteCacheByKey(redisKeyConfig.get('SITE_INFO_MAP'))
  }
}

module.exports = new SiteService()