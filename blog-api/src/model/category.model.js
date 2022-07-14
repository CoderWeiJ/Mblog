// 分类表
const {
  DataTypes,
  DATE
} = require('sequelize')
const { mysqlClient } = require('../db/database.js')

const Category = mysqlClient.define('category', {
  category_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '分类名'
  }
}, { tableName: 'category', createdAt: false, updatedAt: false })
Category.sync()

module.exports = Category