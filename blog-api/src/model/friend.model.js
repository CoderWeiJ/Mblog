// 友链
const {
  DataTypes,
  DATE
} = require('sequelize')
const { mysqlClient } = require('../db/database.js')

const Friend = mysqlClient.define('friend', {
  nickname: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '昵称'
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '描述'
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '站点'
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '头像链接'
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: '公开或隐藏'
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '点击次数'
  }
}, { tableName: 'friend', updatedAt: false })

Friend.sync()

module.exports = Friend