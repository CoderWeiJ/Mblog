const md = require('../plugins/markdown')
const { setMDToHTML } = require('../utils/utils')
const redisKeyConfig = require('../config/redisKey.config')
const { getBlogInfoPageResultByHash, hasKey, saveMapToHash, getListByValue, saveListToValue, getHashData, saveKVToHash, getMapByValue, saveMapToValue, deleteCacheByKey, deleteByHashKey, incrementByHashKey, getValueByHashKey } = require('../service/redis.service')
const { blogDao } = require('../service/mysql.service')
// 工具类
const { formatDate, setNumToBoolean } = require('../utils/utils')
/**
 * @Description: 博客文章业务层实现
 * @Author: CoderWeiJ
 * @Date: 2022-01-25
 */

// 随机博客显示5条
const randomBlogLimitNum = 5
// 最新推荐博客显示3条
const newBlogPageSize = 3
// 每页显示5条博客简介
const pageSize = 5
// 博客简介列表排序方式
const orderBy = {
  is_top: 'desc',
  createdAt: 'desc'
}
const keys = ['is_appreciation', 'is_comment_enabled', 'is_published', 'is_recommend', 'is_top']
// [['is_top', 'desc'], ['createdAt', 'desc']]
// 私密博客提示
const PRIVATE_BLOG_DESCRIPTION = '此文章受密码保护'

class BlogService {

  // 项目启动时，保存所有博客的浏览量到Redis
  async saveBlogViewsToRedis() {
    const redisKey = redisKeyConfig.get('BLOG_VIEWS_MAP')
    const res = await hasKey(redisKey)
    // Redis中没有存储博客浏览量的Hash时
    if (!res) {
      // 从数据库中读取并存入Redis
      const blogViews = await blogDao.getBlogViewsMap()
      const map = {}
      blogViews.forEach(item => {
        map[item['id']] = item['views']
      })
      saveMapToHash(redisKey, map)
    }
  }

  // 按标题和分类查询博客List
  async getListByTitleAndCategoryId(title, categoryId, pageNum, pageSize) {
    const res = await blogDao.getListByTitleAndCategoryId(title, categoryId, pageNum, pageSize)
    // numToBoolean(res.blogList, 'list')
    setNumToBoolean(res.blogList, 'list', keys)
    return res
  }

  // 按关键字根据文章内容搜索公开且无密码保护的博客文章
  async getSearchBlogListByQueryAndIsPublished(query) {
    const searchBlogs = await blogDao.getSearchBlogListByQueryAndIsPublished(query)
    // content内容处理
    searchBlogs.forEach(searchBlog => {
      const content = searchBlog.content // 内容
      const ctnLen = content.length
      let index = content.indexOf(query) - 10
      index = index < 0 ? 0 : index
      let end = index + 21 // 以关键字字符串为中心，返回21个字
      end = end > ctnLen - 1 ? ctnLen - 1 : end
      searchBlog.content = content.substring(index, end)
    })
    return searchBlogs
  }

  // 查询所有博客id和title
  async getIdAndTitleList() {
    return await blogDao.getIdAndTitleList()
  }

  // 查询最新公开博客
  async getNewBlogListByIsPublished() {
    const redisKey = redisKeyConfig.get('NEW_BLOG_LIST')
    const newBlogListFromRedis = await getListByValue(redisKey)
    // 如果redis有值，则返回
    if (newBlogListFromRedis) return JSON.parse(newBlogListFromRedis)
    // 没有，则从mysql查询
    const newBlogList = await blogDao.getNewBlogListByIsPublished(newBlogPageSize)
    // 保存到redis
    // await saveListToValue(redisKey, newBlogList)
    return newBlogList
  }


  // 首页博客简介列表
  getBlogInfoListByIsPublished = async (pageNum = 1) => {
    const redisKey = redisKeyConfig.get('HOME_BLOG_INFO_LIST')
    const pageResultFromRedis = await getBlogInfoPageResultByHash(redisKey, pageNum)
    console.log('redis缓存：', pageResultFromRedis)
    // redis已有当前页缓存
    if (pageResultFromRedis) {
      // 将浏览量更新到redis里的最新浏览量
      console.log('redis查询: ', pageResultFromRedis)
      await this.setBlogViewsFromRedisToPageResult(pageResultFromRedis.blogList)
      return pageResultFromRedis
    }
    // redis里没有缓存，从数据库查询，并添加缓存
    // 查询公开博客的简要信息
    const blogInfos = await blogDao.getBlogInfoListByIsPublished(pageNum, pageSize, orderBy)
    await this.setBlogViewsFromRedisToPageResult(blogInfos.blogList)
    setMDToHTML(blogInfos.blogList, 'description') // markdown转义
    // 添加首页缓存
    saveKVToHash(redisKey, pageNum, blogInfos)
    // console.log('mysql查询结果: ', blogInfos)
    return blogInfos
  }

  /**
   * 将博客对象的浏览量设置为Redis中的最新值
   */
  async setBlogViewsFromRedisToPageResult(pageResult, flag = false) {
    if (pageResult.length === 0) return
    const key = redisKeyConfig.get('BLOG_VIEWS_MAP')

    // 根据分类查询的数据格式不太一样，后期可能改为原始查询
    if (flag) {
      pageResult.forEach(async (item) => {
        const views = await getHashData(key, item.id)
        if (views !== null) item.views = views
      })
      return
    }
    pageResult.forEach(async (item) => {
      const views = await getHashData(key, item.id)
      if (views !== null) item.views = views
    })
  }



  // 根据分类name查询公开博客List
  getBlogInfoListByCategoryNameAndIsPublished = async (categoryName, pageNum) => {
    const res = await blogDao.getBlogInfoListByCategoryNameAndIsPublished(pageNum, pageSize, orderBy, categoryName)
    await this.setBlogViewsFromRedisToPageResult(res.blogList, true)
    setMDToHTML(res.blogList, 'description')
    return res
  }

  // 根据标签name查询公开博客List
  getBlogInfoListByTagNameAndIsPublished = async (tagName, pageNum) => {
    const res = await blogDao.getBlogInfoListByTagNameAndIsPublished(pageNum, pageSize, tagName)
    await this.setBlogViewsFromRedisToPageResult(res.blogList)
    setMDToHTML(res.blogList, 'description')
    return res
  }

  // 查询公开博客年月日List
  getArchiveBlogAndCountByIsPublished = async () => {
    const key = redisKeyConfig.get('ARCHIVE_BLOG_MAP')
    const mapFromRedis = await getMapByValue(key)
    if (mapFromRedis) return mapFromRedis
    const map = {}
    const blogMap = []
    const groupYearMonth = await blogDao.getGroupYearMonthByIsPublished()
    for (let i = 0; i < groupYearMonth.length; i++) {
      const blogs = await blogDao.getArchiveBlogListByYearMonthAndIsPublished(groupYearMonth[i]['createdAt'])
      blogMap.push({
        date: groupYearMonth[i]['createdAt'],
        blogs,
      })
    }
    const count = await this.countBlogByIsPublished()
    map['blogMap'] = blogMap
    map['count'] = count
    await saveMapToValue(key, map) // 保存到redis
    return map
  }

  // 查询随机的公开且推荐文章
  async getRandomBlogListByLimitNumAndIsPublishedAndIsRecommend() {
    const randomBlogs = await blogDao.getRandomBlogListByLimitNumAndIsPublishedAndIsRecommend(randomBlogLimitNum)
    // setPrivacy后续
    return randomBlogs
  }

  // 查询所有文章的浏览量
  async getBlogViewsMap() {
    const blogViewList = await blogDao.getBlogViewsList()
    const map = new Map()
    blogViewList.forEach(item => {
      map.set(item.id, item.views)
    })
    return map
  }

  deleteBlogById = async (id) => {
    blogDao.deleteBlogById(id)
    this.deleteBlogRedisCache()
    // 删除该博客的浏览量缓存
    const key = redisKeyConfig.get('BLOG_VIEWS_MAP')
    deleteByHashKey(key, id)
  }

  async deleteBlogTagByBlogId(blogId) {
    blogDao.deleteBlogTagByBlogId(blogId)
  }

  saveBlog = async (blog) => {
    const res = await blogDao.saveBlog(blog)
    const key = redisKeyConfig.get('BLOG_VIEWS_MAP')
    saveKVToHash(key, res['id'], 0)
    this.deleteBlogRedisCache()
    return res
  }

  // 维护 blog_tag 表(添加)
  saveBlogTag = async (blogId, tagId) => {
    const res = await blogDao.saveBlogTag(blogId, tagId)
    if (res !== 1) throw new Error('维护博客标签关联表失败')
  }

  // 更新博客推荐状态
  updateBlogRecommendById = async (blogId, recommend) => {
    const res = await blogDao.updateBlogRecommendById(blogId, recommend)

    if (res !== 1) throw new Error('操作失败')
  }

  // 更新博客可见性状态
  updateBlogVisibilityById = async (blogId, blogVisibility) => {
    const res = await blogDao.updateBlogVisibilityById(blogId, blogVisibility)
    if (res !== 1) throw new Error('操作失败')
    deleteCacheByKey(redisKeyConfig.get('HOME_BLOG_INFO_LIST'))
    deleteCacheByKey(redisKeyConfig.get('NEW_BLOG_LIST'))
    deleteCacheByKey(redisKeyConfig.get('ARCHIVE_BLOG_MAP'))
  }

  /**
   * 更新博客置顶状态
   * @param {Number} blogId 
   * @param {Boolean} top 
   */
  updateBlogTopById = async (blogId, top) => {
    const res = await blogDao.updateBlogTopById(blogId, top)
    if (res !== 1) throw new Error('操作失败')
    deleteCacheByKey(redisKeyConfig.get('HOME_BLOG_INFO_LIST'))
  }

  /**
   * 
   * @param {Number} blogId 
   */
  updateViewsToRedis = async (blogId) => {
    incrementByHashKey(redisKeyConfig.get('BLOG_VIEWS_MAP'), blogId, 1)
  }

  /**
   * 更新博客阅读次数
   * @param {Number} blogId 
   * @param {Number} views
   */
  updateViews = async (blogId, views) => {
    const res = await blogDao.updateViews(blogId, views)
    if (res !== 1) throw new Error('更新失败')
  }

  /**
   * 按id查询博客
   * @param {Number} id 
   */
  getBlogById = async (id) => {
    const blog = await blogDao.getBlogById(id)
    if (blog.length <= 0) return []
    // 将浏览量设置为Redis中的最新值
    const views = await getValueByHashKey(redisKeyConfig.get('BLOG_VIEWS_MAP'), blog[0].id)
    if (views) blog[0].views = parseInt(views)
    // numToBoolean(blog[0], 'object')  
    setNumToBoolean(blog[0], 'object', keys)
    return blog[0]
  }

  /**
   * 按id查询博客标题
   * @param {Number} id 
   */
  getTitleByBlogId = async (id) => {
    const res = await blogDao.getTitleByBlogId(id)
    if (res.length <= 0) return []
    return res
  }


  /**
   * 按id查询公开博客
   * @param {Number} id 
   */
  getBlogByIdAndIsPublished = async (id) => {
    const blog = await blogDao.getBlogByIdAndIsPublished(id)
    if (blog.length <= 0) return []
    // blog[0].content = md.render(blog[0].content)
    setMDToHTML(blog[0], 'blog')
    // 将浏览量设置为redis中最新的值
    const views = await getValueByHashKey(redisKeyConfig.get('BLOG_VIEWS_MAP'), blog[0].id)
    if (views !== null && views instanceof Number) blog[0].views = views
    return blog[0]
  }

  /**
   * 查询受密码保护文章密码
   * @param {Number} blogId 
   */
  getBlogPassword = async (blogId) => {
    return await blogDao.getBlogPassword(blogId)
  }

  /**
   * 更新博客
   * @param {Object} blog 
   */
  updateBlog = async (blog) => {
    const res = await blogDao.updateBlog(blog)
    if (res !== 1) throw new Error('更新失败')
    this.deleteBlogRedisCache()
    // 更新redis
    saveKVToHash(redisKeyConfig.get('BLOG_VIEWS_MAP'), blog.id, blog.views)
  }

  /**
   * 查询公开博客总数
   * @returns 
   */
  countBlogByIsPublished = async () => {
    return await blogDao.countBlogByIsPublished()
  }

  /**
   * 按分类id查询博客数量
   * @param {Number} categoryId 
   * @returns 
   */
  countBlogByCategoryId = async (categoryId) => {
    return await blogDao.countBlogByCategoryId(categoryId)
  }

  /**
   * 按标签id查询博客数量
   * @param {Number} tagId 
   * @returns 
   */
  countBlogByTagId = async (tagId) => {
    return await blogDao.countBlogByTagId(tagId)
  }

  /**
   * 查询博客是否启用评论
   * @param {Number} blogId 
   * @returns 
   */
  getCommentEnabledByBlogId = async (blogId) => {
    return await blogDao.getCommentEnabledByBlogId(blogId)
  }

  /**
   * 查询博客是否公开
   * @param {Number} blogId 
   * @returns 
   */
  getPublishedByBlogId = async (blogId) => {
    return await blogDao.getPublishedByBlogId(blogId)
  }

  /**
   * 删除首页缓存、最新推荐缓存、归档页面缓存、博客浏览量缓存
   */
  deleteBlogRedisCache = async () => {
    deleteCacheByKey(redisKeyConfig.get('HOME_BLOG_INFO_LIST'))
    deleteCacheByKey(redisKeyConfig.get('NEW_BLOG_LIST'))
    deleteCacheByKey(redisKeyConfig.get('ARCHIVE_BLOG_MAP'))
  }
}

module.exports = new BlogService()