import {
  SAVE_SITE_INFO,
  SAVE_INTRODUCTION,
  SAVE_COMMENT_RESULT,
  SET_COMMENT_QUERY_PAGE_NUM,
  SET_PARENT_COMMENT_ID,
  RESET_COMMENT_FORM,
  RESTORE_COMMENT_FORM,
  SET_COMMENT_QUERY_PAGE,
  SET_COMMENT_QUERY_BLOG_ID,
  SET_IS_BLOG_RENDER_COMPLETE,
  SET_BLOG_PASSWORD_DIALOG_VISIBLE,
  SET_BLOG_PASSWORD_FORM,
  SET_FOCUS_MODE,
  SET_IS_BLOG_TO_HOME,
  SAVE_CLIENT_SIZE,
} from "./mutations-types";

export default {
  [SAVE_SITE_INFO](state: Object | any, siteInfo: string | any) {
    state.siteInfo = siteInfo
  },
  [SAVE_INTRODUCTION](state: Object | any, introduction: object) {    
    state.introduction = introduction
  },
  [SAVE_COMMENT_RESULT](state: Object | any, data: object | any) {
    state.allComment = data.allComment
    state.closeComment = data.closeComment
    state.commentTotalPage = data.comments.totalPage
    state.comments = data.comments.list
  },
  [SET_COMMENT_QUERY_PAGE](state: Object | any, page: number) {
    state.commentQuery.page = page
  },
  [SET_COMMENT_QUERY_BLOG_ID](state: Object | any, blogId: number | null) {
    state.commentQuery.blogId = blogId
  },
  [SET_COMMENT_QUERY_PAGE_NUM](state: Object | any, pageNum: number) {
    state.commentQuery.pageNum = pageNum
  },
  [SET_PARENT_COMMENT_ID](state: Object | any, parentCommentId: number) {
    state.parentCommentId = parentCommentId
  },
  [RESET_COMMENT_FORM](state: Object | any) {
    const commentForm = {
      nickname: state.commentForm.nickname,
      email: state.commentForm.email,
      website: state.commentForm.website
    }
    //保存访客信息，下次评论时自动填充表单
    window.localStorage.setItem('commentForm', JSON.stringify(commentForm))
    state.commentForm.content = ''
    state.commentForm.notice = true
  },
  [RESTORE_COMMENT_FORM](state: Object | any) {
    const lastForm = JSON.parse(window.localStorage.getItem('commentForm') as object | any)
    if (lastForm) {
      state.commentForm.nickname = lastForm.nickname
      state.commentForm.email = lastForm.email
      state.commentForm.website = lastForm.website
    }
  },
  [SET_IS_BLOG_RENDER_COMPLETE](state: Object | any, ok: boolean) {
    state.isBlogRenderComplete = ok
  },
  [SET_BLOG_PASSWORD_DIALOG_VISIBLE](state: Object | any, visible: boolean) {
    state.blogPasswordDialogVisible = visible
  },
  [SET_BLOG_PASSWORD_FORM](state: Object | any, form: object) {
    state.blogPasswordForm = form
  },
  [SET_FOCUS_MODE](state: Object | any, focusMode: boolean) {
    state.focusMode = focusMode
  },
  [SET_IS_BLOG_TO_HOME](state: Object | any, isBlogToHome: boolean) {
    state.isBlogToHome = isBlogToHome
  },
  [SAVE_CLIENT_SIZE](state: Object | any, clientSize: object) {
    state.clientSize = clientSize
  },
}