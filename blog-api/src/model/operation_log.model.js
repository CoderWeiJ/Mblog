// 操作日志
const { DataTypes, DATE } = require('sequelize')
const { mysqlClient } = require('../db/database.js')

const OperationLog = mysqlClient.define('operation_log', {
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '操作者用户名'
  },
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
  times: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '请求耗时(毫秒)'
  },
  user_agent: {
    type: DataTypes.STRING(2000),
    allowNull: true,
    comment: 'user-agent用户代理'
  }
}, { tableName: 'operation_log', updatedAt: false })

OperationLog.sync()

module.exports = OperationLog