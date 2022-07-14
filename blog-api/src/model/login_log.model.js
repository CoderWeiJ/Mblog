// 登录日志

const {
  DataTypes,
  DATE
} = require('sequelize')
const { mysqlClient } = require('../db/database.js')

const LoginLog = mysqlClient.define('login_log', {
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '用户名称'
  },
  ip: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'ip地址'
  },
  ip_source: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'ip来源'
  },
  os: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '操作系统'
  },
  browser: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '浏览器'
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    comment: '登录状态'
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '操作描述'
  },
  user_agent: {
    type: DataTypes.STRING(2000),
    allowNull: true,
    comment: 'user-agent用户代理'
  }
}, { tableName: 'login_log', updatedAt: false })

LoginLog.sync()

module.exports = LoginLog