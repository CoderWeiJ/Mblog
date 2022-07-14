// 评论
const {
  DataTypes,
  DATE
} = require('sequelize')
const { mysqlClient } = require('../db/database.js')

const Comment = mysqlClient.define('comment', {
  nickname: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '昵称'
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '邮箱'
  },
  content: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '评论内容'    
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '头像路径'
  },
  ip: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '评论者ip地址'
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: '公开或回收站'
  },
  is_admin_comment: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: '博主回复'
  },
  page: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '0普通文章 1关于我页面 2友链页面'
  },
  is_notice: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: '接收邮件提醒'
  },
  blog_id: {
    type: DataTypes.BIGINT(20),
    allowNull: true,
    comment: '所属的文章'
  },
  parent_comment_id: {
    type: DataTypes.BIGINT(20),
    allowNull: false,
    comment: '父评论id，-1为根评论'
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '个人网站'
  },
  qq: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '如果评论昵称为QQ号，则将昵称和头像置为QQ昵称和QQ头像，并将此字段置为QQ号备份'
  }
}, {tableName: 'comment', updatedAt: false})

Comment.sync()

module.exports = Comment