// 定时任务
const {
  DataTypes,
  DATE
} = require('sequelize')
const { mysqlClient } = require('../db/database.js')

const ScheduleJob = mysqlClient.define('schedule_job',{
  bean_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'bean名称'
  },
  method_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '方法名'
  },
  params: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '参数'
  },
  cron: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'cron表达式'
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true,
    comment: '任务状态'
  },
  remark: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '备注'
  }
}, {tableName: 'schedule_job', updatedAt: false})

ScheduleJob.sync()

module.exports = ScheduleJob