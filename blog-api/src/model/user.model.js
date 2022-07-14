const { DataTypes, DATE } = require('sequelize')
const { mysqlClient } = require('../db/database.js')

/**
 * @description 博客标签
 * @author CoderWeiJ
 * @Date 2022-01-12
 */

const User = mysqlClient.define('user', {
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '用户名'
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '密码'
  },
  nickname: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '昵称'
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '头像地址'
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '邮箱'
  },
  role: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '角色访问权限'
  },
}, { tableName: 'user'})

User.sync()

module.exports = User