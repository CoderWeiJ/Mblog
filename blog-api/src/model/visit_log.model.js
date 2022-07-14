const { DataTypes, DATE } = require('sequelize')
const { mysqlClient } = require('../db/database.js')

/**
 * @description 访问日志
 * @author CoderWeiJ
 * @Date 2022-01-12
 */

const VisitLog = mysqlClient.define('visit_log', {
  uuid: {
    type: DataTypes.STRING(36),
    allowNull: true,
    comment: '访客标识码'
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
    allowNull: false,
    comment: '请求参数'
  },
  behavior: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '访问行为'
  },
  content: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '访问内容'
  },
  remark: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '备注'
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
}, { tableName: 'visit_log', updatedAt: false })

VisitLog.sync()

module.exports = VisitLog