const commentUtils = require('../utils/comment/commentUtils')
const { commentState } = require('../constant/comment.type')
class CommentController {

  /**
   * 根据页面分页查询评论列表
   *
   * @param type     页面分类（0普通文章，1关于我...）
   * @param blogId   如果page==0，需要博客id参数
   * @param pageNum  页码
   * @param pageSize 每页个数，默认10条评论
   * @param jwt      若文章受密码保护，需要获取访问Token
   * @return
   */
  getComments = async (ctx) => {
    const { type, blogId, pageNum = 1, pageSize = 10, jwt = 'Authorization' } = ctx.request.query
    const openState = commentUtils.judgeCommentState(type, blogId) //评论开关状态
    switch (openState) {
      case commentState.NOT_FOUND: {
        ctx.status = 404
        ctx.body = {
          success: false,
          message: '该博客不存在',
          result: null
        }
        return
      }
      case commentState.CLOSE: {
        ctx.status = 403
        ctx.body = {
          success: false,
          message: '评论已关闭',
          result: null
        }
      }
      case commentState.PASSWORD: {
        // 文章受密码保护，需要验证Token
        // TODO...
        return
      }
      default: break
    }
  }
}

module.exports = new CommentController()