const { DataTypes, DATE } = require('sequelize')
const { mysqlClient } = require('../db/database.js')

/**
 * @description 博客标签
 * @author CoderWeiJ
 * @Date 2022-01-12
 */

const Tag = mysqlClient.define('tag', {
  tag_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '标签名'
  },
  color:  {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '标签颜色(可选)'
  }
}, {tableName: 'tag', updatedAt: false, createdAt: false})

Tag.sync()

module.exports = Tag