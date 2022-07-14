const {
  DataTypes,
} = require('sequelize')
const { mysqlClient } = require('../db/database.js')

const BlogTag = mysqlClient.define('blog_tag', {
  blog_id: {
    type: DataTypes.BIGINT(20),
    allowNull: false,
    comment: '博客id'
  },
  tag_id: {
    type: DataTypes.BIGINT(20),
    allowNull: false,
    comment: '标签id'
  }
}, { tableName: 'blog_tag', createdAt: false, updatedAt: false })

BlogTag.sync()

module.exports = BlogTag