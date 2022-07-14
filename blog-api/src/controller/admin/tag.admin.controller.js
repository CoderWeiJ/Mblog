const { getTagList, getTagByName, saveTag, updateTag, deleteTagById } = require('../../service/tag.service')

/**
 * @Description: 博客标签后台管理
 * @Author: CoderWeiJ
 * @Date: 2020-03-08
 */

class TagAdminController {
  /**
   * 获取博客标签列表
   * 
   * @param pageNum 页码
   * @param pageSize 每页个数
   */
  getTags = async (ctx) => {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    try {
      const { tagList, total } = await getTagList(pageNum, pageSize)
      ctx.body = {
        success: true,
        message: '请求成功',
        result: { tagList, total }
      }
    } catch (error) {
      console.error('获取标签列表失败: ', error.message)
      ctx.body = {
        success: false,
        message: error.message,
        result: null
      }
    }
  }

  saveTag = async (ctx) => {
    const tag = ctx.request.body
    try {
      const res = await this.getResult(tag, 'save')
      ctx.body = {
        success: true,
        message: res
      }
    } catch (error) {
      console.error('添加标签失败: ', error.message)
      ctx.body = {
        success: false,
        message: error.message
      }
    }
  }

  /**
   * 修改标签
   * 
   * @param {Object} tag 标签实体
   */
  updateTag = async (ctx) => {
    const tag = ctx.request.body
    try {
      const res = await this.getResult(tag, 'update')
      ctx.body = {
        success: true,
        message: res
      }
    } catch (error) {
      console.error('更新标签失败: ', error.message)
      ctx.body = {
        success: false,
        message: error.message
      }
    }
  }

  /**
   * 执行标签添加或更新操作：校验参数是否合法，标签是否存在
   * 
   * @param {Object} tag 标签实体
   * @param {String} type 添加或更新
   */
  getResult = async (tag, type) => {
    const { tag_name, id, color } = tag
    if (!tag_name) throw new Error('标签不能为空')
    // 查询标签是否存在
    const tag1 = await getTagByName(tag_name)
    const flag = tag1 && tag1.tag_name === tag_name
    if ('save' === type) {
      if (flag) throw new Error('该标签已存在')
      await saveTag(tag)
      return '标签添加成功'
    } else {
      if (flag && tag1.color === color) throw new Error('更改内容重复')
      await updateTag(tag)
      return '标签更改成功'
    }
  }

  /**
   * 删除标签
   * 
   * @param {Number} id 标签id
   */
  deleteTag = async (ctx) => {
    const { id } = ctx.request.body
    try {
      await deleteTagById(id)
      ctx.body = {
        success: true,
        message: '删除成功'
      }
    } catch (error) {
      console.error('删除标签失败: ', error.message)
      ctx.body = {
        success: false,
        message: '删除失败'
      }
    }
  }
}

module.exports = new TagAdminController()