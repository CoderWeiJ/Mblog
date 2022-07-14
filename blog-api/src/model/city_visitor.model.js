// 游客位置信息
const {
  DataTypes,
  DATE
} = require('sequelize')
const { mysqlClient } = require('../db/database.js')
const CityVisitor = mysqlClient.define('city_visitor', {
  city: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '城市名称'
  },
  uv: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '独立访客数量'
  }
}, { tableName: 'city_visitor', createdAt: false, updatedAt: false })

CityVisitor.sync()

module.exports = CityVisitor