const { DataTypes, DATE } = require('sequelize')
const { mysqlClient } = require('../db/database.js')

/**
 * @description 访客记录
 * @author CoderWeiJ
 * @Date 2022-01-12
 */

const Visitor = mysqlClient.define('visitor', {
  uuid: {
    type: DataTypes.STRING(36),
    allowNull: true,
    comment: '访客标识码'
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
  pv: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '访问页数统计'
  },
  user_agent: {
    type: DataTypes.STRING(2000),
    allowNull: true,
    comment: 'user-agent用户代理'
  }
}, { tableName: 'visitor' })

Visitor.sync()

module.exports = Visitor