const state = {
  siteInfo: {
    webTitleSuffix: '-WeiJ\'s Blog'
  },
  introduction: {
    favorites: [],
    avatar: '',
    name: '',
    rollText: '',
    github: '',
    qq: '',
    bilibili: '',
    netease: '',
    email: ''
  },
  commentQuery: {
    //用于后端判断该评论所在页面类型(文章、友链、关于我)
    type: 0, // 页面分类 0:普通文章 1: 关于我 ruguo type=0，需要博客id参数
    blogId: -1, // 博客id
    pageNum: 1, // 页码
    pageSize: 5 // 每页个数
  },
  allComment: 0,
  closeComment: 0,
  commentTotalPage: 0,
  comments: [],
  parentCommentId: -1,
  commentForm: {
    content: '',
    nickname: '',
    email: '',
    website: '',
    notice: true
  },
  //博客文章渲染完成的标记
  isBlogRenderComplete: false,
  //受保护文章密码对话框
  blogPasswordDialogVisible: false,
  blogPasswordForm: {
    blogId: 0,
    password: ''
  },
  //专注模式
  focusMode: false,
  //文章页面路由到首页的标记
  isBlogToHome: false,
  //可视窗口大小
  clientSize: {
    clientHeight: 1000,
    clientWidth: 1080
  }
}

export default state