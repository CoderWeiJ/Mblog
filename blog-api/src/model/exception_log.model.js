// 异常日志
const {
  DataTypes,
  DATE
} = require('sequelize')
const { mysqlClient } = require('../db/database.js')

const ExceptionLog = mysqlClient.define('exception_log', {
  uri: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '请求接口'
  },
  method: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '请求方式'
  },
  param: {
    type: DataTypes.STRING(2000),
    allowNull: true,
    comment: '请求参数'
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '操作描述'
  },
  error: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '异常信息'
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
  user_agent: {
    type: DataTypes.STRING(2000),
    allowNull: true,
    comment: 'user-agent用户代理'
  }
}, { tableName: 'exception_log', updatedAt: false })

ExceptionLog.sync()

module.exports = ExceptionLog