const redisKeyConfig = require("../config/redisKey.config")
const { getListByValue, saveListToValue, deleteCacheByKey } = require('./redis.service')
const { tagDao } = require('./mysql.service')
/**
 * @Description: 博客标签业务层实现
 * @Author: CoderWeiJ
 * @Date: 2022-02-14
 */


class TagService {

  /**
   * 获取所有标签列表
   * @returns 
   */
  getTagList = async (pageNum, pageSize) => {
    return await tagDao.getTagList(pageNum, pageSize)
  }
  /**
   * 获取所有标签List不查询id
   * @returns 
   */
  getTagListNotId = async () => {
    const key = redisKeyConfig.get('TAG_CLOUD_LIST')
    const tagListFromRedis = await getListByValue(key)
    if (tagListFromRedis) return tagListFromRedis
    // 从数据库查询
    const tagList = await tagDao.getTagListNotId() // 标签列表
    saveListToValue(key, tagList) // 存到redis
    return tagList
  }

  /**
   * 按博客id查询List
   * @param {Number} blogId 
   */
  getTagListByBlogId = async (blogId) => {
    return await tagDao.getTagListByBlogId(blogId)
  }

  /**
   * 添加标签
   * @param {Object} tag 
   */
  saveTag = async (tag_name) => {
    await tagDao.saveTag({tag_name})
    deleteCacheByKey(redisKeyConfig.get('TAG_CLOUD_LIST'))
  }

  /**
   * 按id查询标签
   * @param {Number} id
   */
  getTagById = async (id) => {
    return await tagDao.getTAgById(id)
  }

  /**
   * 按name查询标签
   * @param {String} name 
   */
  getTagByName = async (name) => {
    return await tagDao.getTagByName(name)
  }

  /**
   * 按id删除标签
   * @param {Number} id 
   */
  deleteTagById = async (id) => {
    tagDao.deleteTagById(id)
    deleteCacheByKey(redisKeyConfig.get('TAG_CLOUD_LIST'))
  }

  /**
   * 更新标签
   * @param {Object} tag 
   */
  updateTag = async (tag) => {
    await tagDao.updateTag(tag)
    deleteCacheByKey(redisKeyConfig.get('TAG_CLOUD_LIST'))
    // 修改了标签名或颜色，可能有首页文章关联了标签，也要更新首页缓存
    deleteCacheByKey(redisKeyConfig.get('HOME_BLOG_INFO_LIST'))
  }
}

module.exports = new TagService()