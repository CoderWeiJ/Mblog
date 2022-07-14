import { useRouter } from 'vue-router'
import { SAVE_COMMENT_RESULT, SET_PARENT_COMMENT_ID, RESET_COMMENT_FORM, SET_BLOG_PASSWORD_DIALOG_VISIBLE, SET_BLOG_PASSWORD_FORM } from './mutations-types'
// 引入api
import { getCommentListByQuery, submitComment } from '@/api/comment'
// 引入element-plus组件
import { ElMessage, ElNotification } from 'element-plus'
// 引入其他
import tvMapper from '@/plugins/tvMapper'
import aruMapper from '@/plugins/aruMapper'
import paopaoMapper from '@/plugins/paopaoMapper'
import * as sanitizeHtml from 'sanitize-html'
import router from '@/router'
// const tv = Object.assign([], tvMapper)
// const aru = Object.assign([], tvMapper)
// const paopao = Object.assign([], tvMapper)

export default {
  goBlogPage({ commit }: any, blog: any) {
    if (blog.password) {
      const adminToken = window.localStorage.getItem('adminToken')
      const blogToken = window.localStorage.getItem(`blog${blog.id}`)
      //对于密码保护文章，博主身份Token和经过密码验证后的Token都可以跳转路由，再由后端验证Token有效性
      if (adminToken || blogToken) {
        return router.push(`/blog/${blog.id}`)
      }
      commit(SET_BLOG_PASSWORD_FORM, { blogId: blog.id, password: '' })
      commit(SET_BLOG_PASSWORD_DIALOG_VISIBLE, true)
    } else {
      router.push(`/blog/${blog.id}`)
    }
  },
  async getCommentList({ commit, rootState }: any) {
    // 密码保护的文章，需要发送密码验证通过后保存在localStorage的Token
    const blogToken = window.localStorage.getItem(`blog${rootState.commentQuery.blogId}`)
    // 如果有则发送博主身份Token
    const adminToken = window.localStorage.getItem('adminToken')
    const token = adminToken ? adminToken : blogToken ? blogToken : ''
    // 表情转义
    const replaceEmoji: Function = (comment: any, emoji: object | any) => {
      comment.content = comment.content.replace(new RegExp(emoji.reg, 'g'), `<img src="${emoji.src}" />`)
    }
    const convertEmoji: Function = (comment: any) => {
      tvMapper.forEach((emoji: object) => replaceEmoji(comment, emoji))
      aruMapper.forEach((emoji: object) => replaceEmoji(comment, emoji))
      paopaoMapper.forEach((emoji: object) => replaceEmoji(comment, emoji))
    }
    
    try {
      const res = await getCommentListByQuery(token, rootState.commentQuery)
      if (res.success) {
        // sanitizeHtml配置
        const sanitizeHtmlConfig = {
          allowedTags: [],
          allowedAttributes: false,
          disallowedTagsMode: 'recursiveEscape',
        }
        res.result.comments.list.forEach((comment: object | any) => {
          // 转义评论中的html
          comment.content = sanitizeHtml(comment.content, sanitizeHtmlConfig as any)
          // 查找评论中是否有表情
          if (comment.content.indeOf('@[') != -1) convertEmoji(comment)
          comment.replyComments.forEach((comment: any) => {
            // 转义评论中的html
            comment.content = sanitizeHtml(comment.content, sanitizeHtmlConfig as any)
            // 查找评论中是否有表情
            if (comment.content.indeOf('@[') != -1) convertEmoji(comment)
          })
        })
        commit(SAVE_COMMENT_RESULT, res.data.result)
      } else ElMessage({ message: res.data.message, type: 'success', center: true })
    } catch (error) {
      // ElMessage({ message: '数据获取失败', type: 'error', center: true })
    }
  },
  async submitCommentForm({ rootState, dispatch, commit }: any, token: string) {
    const form = { ...rootState.commentForm }
    console.log('rootState.commentQuery', rootState.commentQuery);
    
    form.page = rootState.commentQuery.page
    form.blogId = rootState.commentQuery.blogId
    form.parentCommentId = rootState.parentCommentId
    console.log('打印表单：', form);
    try {
      const res = await submitComment(token, form)
      if (res.data.success) {
        ElNotification({ title: res.data.message, type: 'success' })
        commit(SET_PARENT_COMMENT_ID, -1)
        commit(RESET_COMMENT_FORM)
        dispatch('getCommentList')
      } else ElNotification({ title: '评论失败', message: res.data.message, type: 'error' })
    } catch (error) {
      ElNotification({ title: '评论失败', message: '异常错误', type: 'error' })
    }
  },
}
