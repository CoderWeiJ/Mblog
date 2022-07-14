const { DataTypes, DATE } = require('sequelize')
const { mysqlClient } = require('../db/database.js')

/**
 * @description 站点设置
 * @author CoderWeiJ
 * @Date 2022-01-12
 */

const SiteSetting = mysqlClient.define('site_setting', {
  name_en: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: ''
  },
  name_zh: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: ''
  },
  value: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
    comment: ''
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '1基础设置 2页脚徽标 3资料卡 4友链信息'
  }
}, { tableName: 'site_setting', createdAt: false, updatedAt: false })

SiteSetting.sync()

module.exports = SiteSetting