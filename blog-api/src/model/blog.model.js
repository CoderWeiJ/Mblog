const { DataTypes } = require('sequelize')
const { mysqlClient } = require('../db/database.js')

const Blog = mysqlClient.define('blog', {
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '文章标题'
  },
  first_picture: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    comment: '文章首图，用于随机文章展示'
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    comment: '文章正文'
  },
  description: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    comment: '描述'
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: '1:公开 0:私密'
  },
  is_recommend: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: '推荐开关'
  },
  is_appreciation: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: '赞赏开关'
  },
  is_comment_enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: '评论开关'
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '浏览次数'
  },
  words: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '文章次数'
  },
  read_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '阅读时长(分钟)'
  },
  category_id: {
    type: DataTypes.BIGINT(20),
    allowNull: false,
    comment: '文章分类'
  },
  is_top: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: '是否置顶'
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '密码保护'
  },
  user_id: {
    type: DataTypes.BIGINT(20),
    allowNull: true,
    comment: '文章作者'
  }
}, { tableName: 'blog' })

Blog.sync()

module.exports = Blog