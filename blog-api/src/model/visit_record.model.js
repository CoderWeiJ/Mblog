const { DataTypes, DATE } = require('sequelize')
const { mysqlClient } = require('../db/database.js')

/**
 * @description 访问记录
 * @author CoderWeiJ
 * @Date 2022-01-12
 */

const VisitRecord = mysqlClient.define('visit_record', {
  pv: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '访问量'
  },
  uv: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '独立用户'
  },
  date: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '日期"01-12"'
  }
}, { tableName: 'visit_record', createdAt: false, updatedAt: false })

VisitRecord.sync()

module.exports = VisitRecord