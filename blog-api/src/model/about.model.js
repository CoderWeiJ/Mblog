const {
  DataTypes,
  DATE
} = require('sequelize')
const { mysqlClient } = require('../db/database.js')

// 关于我的 数据表
const About = mysqlClient.define('about', {
  name_en: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: ''
  },
  name_zh: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: ''
  },
  value: {
    type: DataTypes.TEXT('long'), // longtext
    allowNull: true,
    comment: ''
  }
}, { tableName: 'about', createdAt: false, updatedAt: false })

About.sync()
module.exports = About