const { DataTypes, DATE } = require('sequelize')
const { mysqlClient } = require('../db/database.js')

/**
 * @description 动态
 * @author CoderWeiJ
 * @Date 2022-01-12
 */

const Moment = mysqlClient.define('moment', {
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    comment: '动态内容'
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '点赞数量'
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: '是否公开'
  }
}, { tableName: 'moment', updatedAt: false })

Moment.sync()

module.exports = Moment