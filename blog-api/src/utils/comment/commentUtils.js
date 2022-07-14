const { pageType, commentState } = require('../../constant/comment.type')
const { getBlogPassword, getPublishedByBlogId, getCommentEnabledByBlogId } = require('../../service/blog.service')
const { getAboutCommentEnabled } = require('../../service/about.service')
const { getFriendInfo } = require('../../service/friend.service')

/**
 * 评论工具类
 *
 * @author: CoderWeiJ
 * @date: 2022-02-17
 */

class CommentUtils {

  /**
   * 查询对应页面评论是否开启
   * 
   * @param {Number} type 页面分类(0 普通文章，1 关于我， 2 友链)
   * @param {Number} blogId 
   */
  judgeCommentState = async (type = 0, blogId = 1) => {
    switch (type) {
      case pageType.BLOG: {
        // 普通博客
        const commentEnabled = await getCommentEnabledByBlogId(blogId)
        const published = await getPublishedByBlogId(blogId)// 博客是否公开 0 1 null
        // console.log('查询结果：', commentEnabled, published);
        if (commentEnabled === null || published === null) {
          // 查无此博客
          return commentState.NOT_FOUND
        } else if (!published) {
          // 博客未公开
          return commentState.NOT_FOUND
        } else if (!commentEnabled) {
          // 博客评论已关闭
          return commentState.CLOSE
        }
        // 判断文章是否存在密码
        const password = await getBlogPassword(blogId)
        if (password) return commentState.PASSWORD // 文章有密码
        break
      }
      case pageType.ABOUT: {
        // 关于我页面
        if (!await getAboutCommentEnabled()) {
          // 页面评论已关闭
          return commentState.CLOSE
        }
        break
      }
      case pageType.FRIEND:
        {
          // 友链页面
          const friendInfo = await getFriendInfo(true, false)
          if (!friendInfo.commentEnabled) {
            // 页面评论已关闭
            return commentState.CLOSE
          }
          break
        }
      default: break
    }
    return commentState.OPEN
  }


  /**
   * 对于昵称不是QQ号的评论，根据昵称Hash设置头像
   * 
   * @param {Object} comment 当前收到的评论
   */
  setCommentRandomAvatar = async (comment) => {
    // TODO...
  }

  /**
   * 通用博主评论属性
   * 
   * @param {Object} comment 评论DTO
   * @param {Object} admin 博主信息
   */
  setGeneralAdminComment = async (comment, admin) => {
    // TODO...
  }

  /**
   * 为[Telegram快捷回复] 方式设置评论属性
   * 
   * @param {Object} comment 评论DTO
   */
  setAdminCommentByTelegramAction = async (comment) => {
    // TODO...
  }

  /**
   * 设置博主评论属性
   * 
   * @param {Object} comment 当前收到的评论
   * @param {Object} requrest 用于获取ip
   * @param {Object} admin 博主信息
   */
  setAdminComment = async (comment, requrest, admin) => {
    // TODO...
  }

  /**
   * 
   * @param {Object}} comment 当前收到的评论
   * @param {Object}} request 用于获取ip
   */
  setVisitorComment = async (comment, request) => {
    // TODO...
  }

}

module.exports = new CommentUtils()