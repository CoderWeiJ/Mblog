const { categoryDao } = require('./mysql.service')
const { getListByValue, saveListToValue, deleteCacheByKey } = require('../service/redis.service')
const { getTagById } = require('../service/tag.service')
const redisKeyConfig = require('../config/redisKey.config')
/**
 * @Description: 博客分类业务层实现
 * @Author: CoderWeiJ
 * @Date: 2022-02-14
 */

class CategoryService {


  /**
   * 获取所有分类List
   * @returns 
   */
  getCategoryList = async (pageNum, pageSize) => {
    return await categoryDao.getCategoryList(pageNum, pageSize)
  }
  /**
   * 获取所有分类List不查询id
   * @returns 
   */
  getCategoryNameList = async () => {
    const key = redisKeyConfig.get('CATEGORY_NAME_LIST')
    const categoryListFromRedis = await getListByValue(key)
    if (categoryListFromRedis) return categoryListFromRedis
    // redis没有，从数据库查询
    const categoryList = await categoryDao.getCategoryNameList()

    saveListToValue(key, categoryList) // 保存到redis
  }

  /**
   * 添加分类
   * @param {Object} category 
   */
  saveCategory = async ({category_name}) => {
    const res = await categoryDao.saveCategory(category_name)
    deleteCacheByKey(redisKeyConfig.get('CATEGORY_NAME_LIST'))
    return res
  }

  /**
   * 按id查询分类
   * @param {Number} id 
   * @returns 
   */
  getCategoryById = async (id) => {
    return await categoryDao.getCategoryById(id)
  }

  /**
   * 按name查询分类
   * @param {String} category_name 
   * @returns 
   */
  getCategoryByName = async (category_name) => {
    return await categoryDao.getCategoryByName(category_name)
  }

  /**
   * 按id删除分类
   * @param {Number} id 
   */
  deleteCategoryById = async (id) => {
    await categoryDao.deleteCategoryById(id)
  }

  /**
   * 更新分类
   * @param {Object} category 
   */
  updateCategory = async (category) => {
    await categoryDao.updateCategory(category)
    deleteCacheByKey(redisKeyConfig.get('CATEGORY_NAME_LIST'))
    // 修改了分类名，可能有首页文章关联了分类，也要更新首页缓存
    deleteCacheByKey(redisKeyConfig.get('HOME_BLOG_INFO_LIST'))
  }
}

module.exports = new CategoryService()