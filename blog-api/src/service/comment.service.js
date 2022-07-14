
const { commentDao } = require('./mysql.service')

// 暂停对评论业务的开发
/**
 * @Description: 博客评论业务层实现
 * @Author: CoderWeiJ
 * @Date: 2022-02-18
 */

class CommentService {

  /**
   * 按页面和父评论id查询评论List
   * 
   * @param {Number} type 页面类型
   * @param {Number} blogId 博客id
   * @param {Number} parentCommentId 父评论id
   * @returns 
   */
  getListByPageAndParentCommentId = async (type, blogId, parentCommentId) => {
    const comments = await commentDao.getListByPageAndParentCommentId(type, blogId, parentCommentId) // 父级评论
    for (let i = 0; i < comments.length; i++) {
      // 子评论
      comments[i]['replyComments'] = await commentDao.getListByPageAndParentCommentId(type, blogId, comments[i].id)
    }
    return comments
  }

  /**
   * 查询页面展示的评论List
   * 
   * @param {Number} type 页面类型
   * @param {Number} blogId 博客id
   * @param {Number} parentCommentId 父评论id
   * @returns 
   */
  getPageCommentList = async (type, blogId, parentCommentId) => {
    const comments = commentDao.getPageCommentListByPageAndParentCommentId(type, blogId, parentCommentId)
    for (let i = 0; i < comments.length; i++) {
      comments[i]['']
    }
  }

  getReplyComments = async (tmpComments, comments) => {
    for (let i = 0; i < comments.length; i++) {
      tmpComments.push(comments[i])
    }
  }


}

module.exports = new CommentService()