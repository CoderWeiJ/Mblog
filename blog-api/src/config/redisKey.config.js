
/**
 * @Description: Redis key配置
 * @Author: CoderWeiJ
 * @Date: 2022-01-25
 */
const keys = [
  ['HOME_BLOG_INFO_LIST', 'homeBlogInfoList'], // 首页博客简介列表 分页对象key：homeBlogInfoList : {{1,"第一页的缓存"},{2,"第二页的缓存"}}
  ['CATEGORY_NAME_LIST', 'categoryNameList'], // 分类名列表key
  ['TAG_CLOUD_LIST', 'tagCloudList'], // 标签云列表key
  ['SITE_INFO_MAP', 'siteInfoMap'], // 站点信息key
  ['NEW_BLOG_LIST', 'newBlogList'], // 最新推荐博客key
  ['ABOUT_INFO_MAP', 'aboutInfoMap'], // 关于我页面key
  ['FRIEND_INFO_MAP', 'friendInfoMap'], // 友链页面信息key
  ['ARCHIVE_BLOG_MAP', 'archiveBlogMap'], // 博客归档key
  ['BLOG_VIEWS_MAP', 'blogViewsMap'], // 博客访问量key
  ['IDENTIFICATION_SET', 'identificationSet'], // 访客标识码key
]
const redisKeyConfig = new Map(keys)

module.exports = redisKeyConfig