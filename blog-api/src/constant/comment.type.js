
// 评论所在页面类型
const pageType = {
  BLOG: 0, // 普通博客文章页面
  ABOUT: 1, // 关于我页面
  FRIEND: 2 // 友链页面
}

// 博客状态
const commentState = {
  NOT_FOUND: 0, // 查无此博客，博客未公开
  CLOSE: 1, // 评论已关闭
  OPEN: 2, // 评论正常开放
  PASSWORD: 3, // 有密码
}

module.exports = { pageType, commentState }