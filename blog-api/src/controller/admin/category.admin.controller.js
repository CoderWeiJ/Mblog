const { getCategoryList, getCategoryByName, saveCategory, updateCategory, deleteCategoryById } = require('../../service/category.service')
const redisKeyConfig = require('../../config/redisKey.config')
/**
 * @Description: 博客分类业务层实现
 * @Author: CoderWeiJ
 * @Date: 2022-03-08
 */
class CategoryAdminController {
  /**
   * 获取博客分类列表
   * 
   * @param {Object} ctx 上下文
   */
  getCategoryList = async (ctx) => {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    try {
      const { categoryList, total } = await getCategoryList(pageNum, pageSize)
      ctx.body = {
        success: true,
        message: '请求成功',
        result: { categoryList, total }
      }
    } catch (error) {
      console.error('category.admin.controller [getCategoryList] Error: ', error.message)
      ctx.body = {
        success: false,
        message: '请求失败',
        result: null
      }
    }
  }

  /**
   * 保存分类
   * 
   */
  saveCategory = async (ctx) => {
    const { category } = ctx.request.body
    try {
      const res = await this.getResult(category, 'save')
      ctx.body = {
        success: true,
        message: res
      }
    } catch (error) {
      ctx.body = {
        success: false,
        message: error.message
      }
    }
  }

  /**
   * 更新分类
   * 
   */
  updateCategory = async (ctx) => {
    const { category } = ctx.request.body
    try {
      const res = await this.getResult(category, 'update')
      ctx.body = {
        success: true,
        message: res
      }
    } catch (error) {
      console.error('更新分类异常：', error.message)
      ctx.body = {
        success: false,
        message: error.message
      }
    }
  }

  /**
   * 执行分类添加或更新操作：校验参数是否合法，分类是否已经存在
   * 
   * @param {Object} category 分类实体
   * @param {String} type 操作类型: 添加 / 更新
   */
  getResult = async (category, type) => {
    const { category_name, id } = category
    if (!category_name) throw new Error('分类名称不能为空')
    // 查询分类是否存在
    const cate = await getCategoryByName(category_name)
    // 更新 / 保存分类时，分类名不能一样
    if (cate && cate.category_name === category_name) throw new Error('该分类已存在')
    if ('save' === type) {
      await saveCategory(category)
      return '分类添加成功'
    } else {
      await updateCategory(category)
      return '分类更新成功'
    }
  }

  /**
   * 删除分类
   * 
   * @param {Number} id 分类id 
   */
  deleteCategory = async (ctx) => {
    const { id } = ctx.request.body
    try {
      await deleteCategoryById(id)
      ctx.body = {
        success: true,
        message: '删除成功'
      }
    } catch (error) {
      ctx.body = {
        success: false,
        message: '删除失败'
      }
    }
  }
}

module.exports = new CategoryAdminController()