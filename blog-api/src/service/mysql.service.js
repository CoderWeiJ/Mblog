const { Op, QueryTypes } = require('sequelize') // 操作符
const { mysqlClient } = require('../db/database')
const Blog = require('../model/blog.model')
const Category = require('../model/category.model')
const Moment = require('../model/moment.model')
const { getRandomColor } = require('../utils/randomColor')
/**
 * @Description: Mysql相关操作
 * @Author: CoderWeiJ
 * @Date: 2022-01-25
 */
// 计算总页数
const getTotalPage = async (sql) => {
  let len = await mysqlClient.query(sql, { type: QueryTypes.SELECT })
  len = len[0].rows
  console.log('打印记录数：', len)
  return len
}

const getLimit = (pageNum, pageSize) => {
  if ([pageNum, pageSize].includes(undefined)) return ''
  const offset = (pageNum - 1) * pageSize
  return `LIMIT ${pageSize} OFFSET ${offset}`
}
class BlogDao {
  // 查询所有文章的浏览量
  async getBlogViewsMap() {
    return await Blog.findAll({ attributes: ['id', 'views'] })
  }

  // 按标题和分类查询博客List
  async getListByTitleAndCategoryId(title, categoryId, pageNum, pageSize) {
    if (categoryId !== '') categoryId = Number(categoryId)
    // 条件判断
    const handleAnd = title !== '' && categoryId !== ''
    const handleTitle = title !== ''
    const handleId = typeof categoryId === 'number'
    // limit
    const limit = getLimit(pageNum, pageSize)
    // 条件
    const where = `${handleTitle || handleId ? 'WHERE' : ''} ${handleTitle ? 'b.title LIKE "%' + title + '%" ' : ''} ${(handleAnd ? 'AND' : '') + (handleId ? ' b.category_id=' + categoryId : '')}`
    // 结果
    const blogList = await mysqlClient.query(`
    SELECT b.id, b.title, b.first_picture, b.createdAt, b.updatedAt, b.is_published, b.is_recommend, b.is_appreciation,b.is_comment_enabled, b.is_top, b.password,c.id as category_id, c.category_name 
    FROM blog as b LEFT JOIN category as c on b.category_id=c.id
    ${where} ${limit}`, { type: QueryTypes.SELECT })
    const total = await getTotalPage(`
    SELECT COUNT(*) as rows
    FROM blog as b LEFT JOIN category as c on b.category_id=c.id
    ${where}`)
    return { blogList, total }
  }

  // 按关键字根据文章内容搜索公开且无密码保护的博客文章
  async getSearchBlogListByQueryAndIsPublished(query) {
    return await Blog.findAll({
      attributes: ['id', 'title', 'content'],
      where: {
        'is_published': true,
        'password': '',
        'content': {
          [Op.like]: `%${query}%`
        }
      }
    })
  }

  // 查询所有博客id和title
  async getIdAndTitleList() {
    return await Blog.findAll({
      attributes: ['id', 'title'],
      order: [['createdAt', 'DESC']], // 如果报错就尝试下面的写法
      // order: 'createdAt DESC'
    })
  }

  // 查询最新公开博客
  async getNewBlogListByIsPublished(newBlogPageSize) {
    return await mysqlClient.query(`SELECT id, title, PASSWORD
    FROM blog
    WHERE is_published = TRUE
    ORDER BY createdAt DESC
    LIMIT ${newBlogPageSize}
    OFFSET 0`, { type: QueryTypes.SELECT })
  }

  // 查询公开博客的简要信息
  getBlogInfoListByIsPublished = async (pageNum, pageSize, orderBy) => {
    const limit = getLimit(pageNum, pageSize)
    const blogList = await mysqlClient.query(`select b.id, b.title, b.description, b.is_top, b.createdAt, b.views, b.words, b.read_time, b.password, c.category_name
    FROM blog as b left join category as c on b.category_id=c.id
    WHERE b.is_published=true
    ORDER BY b.is_top DESC, b.createdAt DESC
    ${limit}`, { type: QueryTypes.SELECT })
    const totalPage = await getTotalPage(`SELECT COUNT(*) as rows FROM blog WHERE blog.is_published=true`)
    console.log('查询结果：', blogList, totalPage)
    return { blogList, totalPage }
  }



  // 根据分类 name 查询公开博客List
  async getBlogInfoListByCategoryNameAndIsPublished(pageNum, pageSize, orderBy, categoryName) {
    const limit = getLimit(pageNum, pageSize)
    const blogList = await mysqlClient.query(`
    SELECT b.id, b.title, b.description, b.is_top, b.createdAt, b.views, b.words, b.read_time, b.password, c.category_name
    FROM category as c LEFT JOIN blog as b on b.category_id=c.id
    WHERE c.category_name='${categoryName}' and b.is_published=true
    ORDER BY b.is_top DESC, b.createdAt DESC
    ${limit}`, { type: QueryTypes.SELECT })
    const totalPage = await getTotalPage(`SELECT COUNT(*) as rows FROM category as c LEFT JOIN blog as b on b.category_id=c.id WHERE c.category_name='${categoryName}' and b.is_published=true`)
    return { blogList, totalPage }
  }

  // 根据标签name查询公开博客List
  async getBlogInfoListByTagNameAndIsPublished(pageNum, pageSize, tagName) {
    const limit = getLimit(pageNum, pageSize)
    const blogList = await mysqlClient.query(`select b.id, b.title, b.description, b.is_top, b.createdAt, b.views, b.words, b.read_time, b.password, c.category_name
    from (((tag as t left join blog_tag as bt on t.id=bt.tag_id) left join blog as b on bt.blog_id=b.id) left join category as c on b.category_id=c.id)
    where t.tag_name='${tagName}' and b.is_published=true order by is_top DESC, createdAt DESC ${limit}`, { type: QueryTypes.SELECT })
    const totalPage = await getTotalPage(`select COUNT(*) as rows
    from (((tag as t left join blog_tag as bt on t.id=bt.tag_id) left join blog as b on bt.blog_id=b.id) left join category as c on b.category_id=c.id)
    where t.tag_name='${tagName}' and b.is_published=true`)
    return { blogList, totalPage }
  }

  // 查询公开博客年月List
  async getGroupYearMonthByIsPublished() {
    return await mysqlClient.query(`
    SELECT DISTINCT DATE_FORMAT(createdAt, '%Y年%m月') as createdAt
    FROM blog
    WHERE is_published=true
    group by DATE_FORMAT(createdAt, '%Y年%m月')
    ORDER BY DATE_FORMAT(createdAt, '%Y年%m月') DESC
    `, { type: QueryTypes.SELECT })
  }

  async getArchiveBlogListByYearMonthAndIsPublished(createdAt) {
    return await mysqlClient.query(`
    SELECT id, title, password, DATE_FORMAT(createdAt, '%d日') as createdAt
    FROM blog
    WHERE DATE_FORMAT(createdAt, '%Y年%m月')='${createdAt}'
    ORDER BY createdAt DESC 
    `, { type: QueryTypes.SELECT })
  }

  // 查询公开博客总数
  async countBlogByIsPublished() {
    const count = await mysqlClient.query(`SELECT COUNT(*) AS count FROM blog WHERE is_published=true`, { type: QueryTypes.SELECT })
    if (count.length > 0) return count[0]['count']
    return null
  }

  // 查询随机的公开且推荐文章
  async getRandomBlogListByLimitNumAndIsPublishedAndIsRecommend(randomBlogLimitNum) {
    return await mysqlClient.query(`
    SELECT id, title, password, createdAt, first_picture
    FROM blog
    WHERE is_published=true and is_recommend=true
    ORDER BY rand() limit ${randomBlogLimitNum}
        `, { type: QueryTypes.SELECT })

  }

  // 查询所有文章的浏览量
  async getBlogViewsList() {
    return await mysqlClient.query(`select id, views from blog`, { type: QueryTypes.SELECT })
  }

  // 按id删除博客
  async deleteBlogById(id) {
    await mysqlClient.query(`DELETE FROM blog WHERE id=${id}`, { type: QueryTypes.DELETE })
  }

  // 维护 blog_tag 表(删除)
  async deleteBlogTagByBlogId(blogId) {
    await mysqlClient.query(`delete from blog_tag where blog_id=${blogId}`, { type: QueryTypes.DELETE })
  }

  // 保存博客
  async saveBlog(blog) {
    const { title, first_picture, content, description, is_published, is_recommend, is_appreciation, is_comment_enabled, is_top, createdAt, updatedAt, views, words, read_time, category, user_id, password } = blog
    // const res = await mysqlClient.query(`
    // INSERT INTO blog (
    //   title,
    //   first_picture,
    //   content,
    //   description,
    //   is_published,
    //   is_recommend,
    //   is_appreciation,
    //   is_comment_enabled,
    //   views,
    //   words,
    //   read_time,
    //   category_id,
    //   is_top,
    //   user_id,
    //   password,
    //   createdAt,
    //   updatedAt 
    // )
    //   values ('${title}', '${first_picture}', '${content}', '${description}', ${is_published}, ${is_recommend}, ${is_appreciation}, ${is_comment_enabled},
    //    ${views}, ${words}, ${read_time}, ${category['id']}, ${is_top}, ${user_id}, ${password}, NOW(), NOW())
    // `, { type: QueryTypes.INSERT })
    const res = await Blog.create({
      title,
      first_picture,
      content,
      description,
      is_published,
      is_recommend,
      is_appreciation,
      is_comment_enabled,
      views,
      words,
      read_time,
      category_id: category['id'],
      is_top,
      user_id,
      password,
      createdAt,
      updatedAt
    })
    return res.dataValues // [表的数据量，插入结果(1 or 0)]
  }

  // 维护 blog_tag 表(添加)
  async saveBlogTag(blogId, tagId) {
    const res = await mysqlClient.query(`INSERT INTO blog_tag (blog_id, tag_id) VALUES (${blogId}, ${tagId})`, { type: QueryTypes.INSERT })
    return res[1]
  }
  /**
   * 
   * @param {Number} blogId 
   * @param {Object} bv 
   *  Boolean is_appreciation;//赞赏开关
      Boolean is_recommend;//推荐开关
      Boolean is_comment_enabled;//评论开关
      Boolean is_top;//是否置顶
      Boolean is_published;//公开或私密
      String password;//密码保护
   */
  async updateBlogVisibilityById(blogId, bv) {
    const res = await mysqlClient.query(`update blog set is_appreciation=${bv.is_appreciation}, is_recommend=${bv.is_recommend}, is_comment_enabled=${bv.is_comment_enabled},
    is_top=${bv.is_top}, is_published=${bv.is_published}, password='${bv.password}'
    where id=${blogId}`, { type: QueryTypes.UPDATE })
    return res[1]
  }

  // 更新博客置顶状态
  async updateBlogTopById(blogId, top) {
    const res = await mysqlClient.query(`update blog set is_top=${top} where id=${blogId}`, { type: QueryTypes.UPDATE })
    return res[1]
  }

  // 更新博客推荐状态
  async updateBlogRecommendById(blogId, recommend) {
    const res = await mysqlClient.query(`update blog set is_recommend=${recommend} where id=${blogId}`, { type: QueryTypes.UPDATE })
    return res[1]
  }

  // 更新博客阅读次数
  async updateViews(blogId, views) {
    const res = await mysqlClient.query(`update blog set views=${views} where id=${blogId}`, { type: QueryTypes.UPDATE })
    return res[1]
  }

  // 按id查询博客
  async getBlogById(id) {
    return await mysqlClient.query(`select b.id, b.title, b.first_picture, b.content, b.description, b.is_recommend, b.is_published, b.is_appreciation,
    b.is_comment_enabled, b.is_top, b.createdAt, b.updatedAt, b.views, b.words, b.read_time, b.password,
    c.id as category_id, c.category_name    
    from (((blog as b left join category as c on b.category_id=c.id) left join blog_tag as bt on b.id=bt.blog_id) left join tag as t on bt.tag_id=t.id)
    where b.id=${id}`, { type: QueryTypes.SELECT })
  }

  // 按id查询博客标题
  async getTitleByBlogId(id) {
    return await mysqlClient.query(`select title from blog where id=${id}`, { type: QueryTypes.SELECT })
  }

  // 按id查询公开博客
  getBlogByIdAndIsPublished = async (id) => {
    return await mysqlClient.query(`SELECT b.id, b.title, b.content, b.is_appreciation, b.is_comment_enabled, b.is_top,b.createdAt, b.updatedAt, b.views, b.words, b.read_time, b.password,c.category_name
    FROM blog AS b, category AS c
    WHERE b.id=${id} AND b.is_published=true AND b.category_id=c.id`, { type: QueryTypes.SELECT })
  }

  // 查询受密码保护文章密码
  async getBlogPassword(blogId) {
    const res = await mysqlClient.query(`SELECT password FROM blog WHERE id=${blogId}`, { type: QueryTypes.SELECT })
    if (res.length > 0) res[0]['password']
    return null
  }

  // 更新博客
  async updateBlog({ id, title, read_time, first_picture, content, description, is_published, is_recommend, is_appreciation, is_comment_enabled, views, words, is_top, password, category, updatedAt }) {
    const res = await Blog.update({
      title,
      read_time,
      first_picture,
      content,
      description,
      is_published,
      is_recommend,
      is_appreciation,
      is_comment_enabled,
      views,
      words,
      is_top,
      password,
      category_id: category['id'],
      updatedAt
    },
      {
        where: { id }
      })
    return res[0]
  }


  // 按分类id查询博客数量
  async countBlogByCategoryId(categoryId) {
    return await mysqlClient.query(`SELECT COUNT(*) FROM blog WHERE category_id=${categoryId}`, { type: QueryTypes.SELECT })
  }

  // 按标签id查询博客数量
  async countBlogByTagId(tagId) {
    return await mysqlClient.query(`SELECT COUNT(*) FROM blog_tag WHERE tag_id=${tagId}`, { type: QueryTypes.SELECT })
  }

  // 查询博客是否启用评论
  async getCommentEnabledByBlogId(blogId) {
    const res = await mysqlClient.query(`SELECT is_comment_enabled FROM blog WHERE id=${blogId}`, { type: QueryTypes.SELECT })
    if (res.length > 0) return res[0]['is_comment_enabled']
    return null
  }

  // 查询博客是否公开
  async getPublishedByBlogId(blogId) {
    const res = await mysqlClient.query(`SELECT is_published FROM blog WHERE id=${blogId}`, { type: QueryTypes.SELECT })
    if (res.length > 0) return res[0]['is_published']
    return null // 查不到该博客，返回null
  }

}

class SiteDao {
  // 查询站点设置
  getList = async () => {
    return await mysqlClient.query(`SELECT * FROM site_setting`, { type: QueryTypes.SELECT })
  }

  // 查询网页标题后缀
  getWebTitleSuffix = async () => {
    const res = await mysqlClient.query(`SELECT value FROM site_setting WHERE name_en='webTitleSuffix'`, { type: QueryTypes.SELECT })
    if (res.length > 0) return res[0]['value']
    return null
  }

  // 删除
  deleteSiteSettingById = async (id) => {
    const res = await mysqlClient.query(`DELETE FROM site_setting WHERE id=${id}`, { type: QueryTypes.DELETE })
    return res[1]
  }

  // 添加
  saveSiteSetting = async ({ name_en, name_zh, value, type }) => {
    const res = await mysqlClient.query(`INSERT INTO site_setting (name_en, name_zh, value, type) VALUES ('${name_en}', '${name_zh}', '${value}', ${type})`, { type: QueryTypes.INSERT })
    return res[1]
  }

  // 更新
  updateSiteSetting = async ({ value, id }) => {
    const res = await mysqlClient.query(`UPDATE site_setting SET value='${value}' WHERE id=${id}`, { type: QueryTypes.UPDATE })
    return res[1]
  }

  // 更新友链页面content
  updateFriendInfoContent = async ({ content }) => {
    const res = await mysqlClient.query(`UPDATE site_setting SET value='${content}' WHERE name_en='friendContent'`, { type: QueryTypes.UPDATE })
    return res[1]
  }

  // 更新友链页面commentEnabled
  updateFriendInfoCommentEnabled = async ({ commentEnabled }) => {
    const res = await mysqlClient.query(`UPDATE site_setting SET value='${commentEnabled}' WHERE name_en='friendCommentEnabled'`, { type: QueryTypes.UPDATE })
    return res[1]
  }
}

class CategoryDao {
  // 获取分类列表
  getCategoryList = async (pageNum, pageSize) => {
    const limit = getLimit(pageNum, pageSize)
    const sql = `SELECT COUNT(*) as rows FROM category`
    const categoryList = await mysqlClient.query(`
    SELECT id, category_name
    FROM category
    ORDER BY id DESC
    ${limit}
    `, { type: QueryTypes.SELECT })
    const total = await getTotalPage(sql)
    return { categoryList, total }
  }

  // 获取所有分类List不查询id
  getCategoryNameList = async () => {
    return await mysqlClient.query(`SELECT category_name FROM category ORDER BY id DESC`, { type: QueryTypes.SELECT })
  }

  // 添加分类
  saveCategory = async (category_name) => {
    // const res = await mysqlClient.query(`INSERT INTO category (category_name) values ('${category_name}')`, { type: QueryTypes.INSERT })
    const res = await Category.create({
      category_name,
    })
    return res.dataValues
  }

  // 按id查询分类
  getCategoryById = async (id) => {
    return await mysqlClient.query(`SELECT id, category_name FROM category WHERE id=${id}`, { type: QueryTypes.SELECT })
  }

  // 按name查询分类
  getCategoryByName = async (category_name) => {
    const res = await mysqlClient.query(`SELECT id, category_name FROM category WHERE category_name='${category_name}'`, { type: QueryTypes.SELECT })
    console.log(res)
    if (res.length > 0) return res[0]
    return null
  }

  // 按id删除分类
  deleteCategoryById = async (id) => {
    const res = await mysqlClient.query(`DELETE FROM category WHERE id=${id}`, { type: QueryTypes.DELETE })
  }
  // 更新分类
  updateCategory = async ({ category_name, id }) => {
    const res = await mysqlClient.query(`UPDATE category SET category_name='${category_name}' where id=${id}`, { type: QueryTypes.UPDATE })
    return res[1]
  }
}


class TagDao {

  // 获取所有标签列表
  getTagList = async (pageNum, pageSize) => {
    const limit = getLimit(pageNum, pageSize)
    const sql = `SELECT COUNT(*) as rows FROM tag`
    const tagList = await mysqlClient.query(`
    SELECT id, tag_name, color
    FROM tag
    ORDER BY id DESC
    ${limit}
    `, { type: QueryTypes.SELECT })
    const total = await getTotalPage(sql)
    return { tagList, total }
  }

  // 获取所有标签List不查询id
  getTagListNotId = async () => {
    return await mysqlClient.query(`SELECT tag_name, color from tag order by id DESC`, { type: QueryTypes.SELECT })
  }

  // 按博客id查询List
  getTagListByBlogId = async (blogId) => {
    return await mysqlClient.query(`
    SELECT t.id, t.tag_name, t.color
    FROM blog_tag AS bt LEFT JOIN tag AS t ON bt.tag_id=t.id
    WHERE bt.blog_id=${blogId}`, { type: QueryTypes.SELECT })
  }

  // 添加标签
  saveTag = async ({ tag_name, color = getRandomColor() }) => {
    const res = await mysqlClient.query(`insert into tag (tag_name, color) values ('${tag_name}', '${color}')`, { type: QueryTypes.INSERT })
    return res[1]
  }

  // 按id查询标签
  getTAgById = async (id) => {
    return await mysqlClient.query(`SELECT id, tag_name, color FROM tag WHERE id=${id}`, { type: QueryTypes.SELECT })
  }

  // 按name查询标签
  getTagByName = async (name) => {
    const res = await mysqlClient.query(`SELECT id, tag_name, color FROM tag WHERE tag_name='${name}'`, { type: QueryTypes.SELECT })
    if (res.length > 0) return res[0]
    return null
  }

  // 按id删除标签
  deleteTagById = async (id) => {
    await mysqlClient.query(`delete from tag where id=${id}`, { type: QueryTypes.DELETE })
  }

  // 更新标签
  updateTag = async ({ id, tag_name, color }) => {
    await mysqlClient.query(`UPDATE tag SET tag_name='${tag_name}', color='${color}' WHERE id=${id}`, { type: QueryTypes.UPDATE })
  }
}

class AboutDao {
  // 查询关于我设置
  getList = async () => {
    return await mysqlClient.query(`SELECT id, name_en, value FROM about`, { type: QueryTypes.SELECT })
  }

  // 查询关于我页面评论开关状态
  getAboutCommentEnabled = async () => {
    const res = await mysqlClient.query(`SELECT value FROM about WHERE name_en='commentEnabled'`, { type: QueryTypes.SELECT })
    if (res.length > 0) return res[0]['value']
    return null
  }

  // 更新关于我设置
  updateAbout = async (name_en, value) => {
    const res = mysqlClient.query(`UPDATE about SET value='${value}' WHERE name_en='${name_en}'`)
    return res[1]
  }

  // 查询关于我页面评论开关状态
  getAboutCommentEnabled = async () => {
    const res = await mysqlClient.query(`SELECT value FROM about WHERE name_en='commentEnabled'`, { type: QueryTypes.SELECT })
    if (res.length > 0) return res[0]['value']
    return null
  }
}

class FriendDao {

  // 查询友链页面信息
  getFriendInfo = async () => {
    return await mysqlClient.query(`SELECT * FROM site_setting WHERE type=4`, { type: QueryTypes.SELECT })
  }


  // 查询友链List
  getFriendList = async () => {
    return await mysqlClient.query(`SELECT id, nickname, description, website, avatar, is_published, views, createdAt FROM friend`, { type: QueryTypes.SELECT })
  }

  // 查询友链VO List
  getFriendVOList = async () => {
    return await mysqlClient.query(`SELECT nickname, description, website, avatar FROM friend WHERE is_published=true ORDER BY rand()`, { type: QueryTypes.SELECT })
  }

  // 更新友链更新状态
  updateFriendPublishedById = async (friendId, published) => {
    const res = await mysqlClient.query(`update friend set is_published=${published} where id=${friendId}`, { type: QueryTypes.UPDATE })
    return res[1]
  }

  // 添加友链
  saveFriend = async ({ nickname, description, website, avatar, published, views, createdAt }) => {
    const res = await mysqlClient.query(`INSERT INTO friend (nickname, description, website, avatar, is_published, views, createdAt)
    values ('${nickname}', '${description}', '${website}', '${avatar}', ${published}, ${views}, ${createdAt})`, { type: QueryTypes.INSERT })
    return res[1]
  }

  // 更新友链
  updateFriend = async ({ nickname, description, website, avatar, published }) => {
    const res = await mysqlClient.query(`UPDATE friend SET nickname=${nickname}, description=${description}, website=${website}, avatar=${avatar}, is_published=${published}
    where id=#{id}`, { type: QueryTypes.UPDATE })
    return res[1]
  }

  // 按id删除友链
  deleteFriend = async (id) => {
    await mysqlClient.query(`DELETE FROM friend WHERE id=${id}`, { type: QueryTypes.DELETE })
  }

  // 增加友链浏览次数
  updateViewsByNickname = async (nickname) => {
    const res = mysqlClient.query(`UPDATE friend SET views=views+1 WHERE nickname=${nickname}`, { type: QueryTypes.UPDATE })
    return res[1]
  }
}

class CommentDao {

  // 按页面和父评论id查询评论List
  getListByPageAndParentCommentId = async (type, blogId, parentCommentId) => {
    return await mysqlClient.query(`
    SELECT c.id, c.nickname, c.email, c.content, c.avatar, c.createdAt, c.ip, c.is_published, c.is_admin_comment, c.page,c.is_notice, c.parent_comment_id, c.website, c.blog_id, c.qq, b.title
    FROM comment AS c LEFT JOIN blog AS b on c.blog_id=b.id
    WHERE c.page = ${type} AND c.blog_id=${blogId} AND c.parent_comment_id=${parentCommentId}
    `, { type: QueryTypes.SELECT })
  }

  // 查询页面展示的评论List
  getPageCommentListByPageAndParentCommentId = async (type, blogId, parentCommentId) => {
    return await mysqlClient.query(`SELECT c1.id, c1.nickname, c1.content, c1.avatar, c1.createdAt, c1.is_admin_comment, c1.website,
    c1.parent_comment_id as parent_comment_id, c2.nickname AS parent_comment_nickname
    FROM comment AS c1 LEFT JOIN comment AS c2 ON c1.parent_comment_id=c2.id
    WHERE c1.page=${type} AND c1.blog_id=${blogId} AND c1.parent_comment_id=${parentCommentId} AND c1.is_published=true
    ORDER BY c1.createdAt DESC`, { type: QueryTypes.SELECT })
  }
}

class MomentDao {

  // 查询动态List
  getMomentList = async (pageNum, pageSize) => {
    const limit = getLimit(pageNum, pageSize)
    const sql = `SELECT COUNT(*) as rows FROM moment`
    const total = await getTotalPage(sql)
    const moments = await mysqlClient.query(`
     SELECT id, content, createdAt, likes, is_published
     FROM moment
     ORDER BY createdAt DESC
     ${limit}`, { type: QueryTypes.SELECT })
    console.log('查询动态List：', moments, total)
    return {
      moments,
      total
    }
  }

  // 点赞
  addLikeByMomentId = async (id) => {
    const res = await mysqlClient.query(`UPDATE moment SET likes=likes+1 WHERE id=${id}`, { type: QueryTypes.UPDATE })
    return res[1]
  }

  // 更新动态发布状态
  updateMomentPublishedById = async (id, is_published) => {
    await mysqlClient.query(`UPDATE moment SET is_published=${is_published} WHERE id=${id}`, { type: QueryTypes.UPDATE })
  }

  getMomentById = async (id) => {
    const res = await mysqlClient.query(`SELECT id, content, createdAt, likes, is_published FROM moment WHERE id=${id}`, { type: QueryTypes.SELECT })
    if (res.length > 0) return res[0]
    return null
  }

  updateMoment = async ({ id, content, createdAt, likes, is_published }) => {
    await Moment.update({
      content,
      createdAt,
      likes,
      is_published
    }, { where: { id } })
  }

  saveMoment = async ({ content, createdAt, likes, is_published }) => {
    await Moment.create({
      content,
      createdAt,
      likes,
      is_published
    })
  }

  deleteMomentById = async (id) => {
    await mysqlClient.query(`DELETE FROM moment WHERE id=${id}`, { type: QueryTypes.DELETE })
  }
}

module.exports = {
  blogDao: new BlogDao(),
  siteDao: new SiteDao(),
  categoryDao: new CategoryDao(),
  tagDao: new TagDao(),
  aboutDao: new AboutDao(),
  friendDao: new FriendDao(),
  commentDao: new CommentDao(),
  momentDao: new MomentDao(),
}

