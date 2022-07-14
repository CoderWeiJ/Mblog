// 定时任务日志
const {
  DataTypes,
  DATE
} = require('sequelize')
const { mysqlClient } = require('../db/database.js')

const ScheduleJobLog = mysqlClient.define('schedule_job_log', {
  job_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '任务id'
  },
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
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    comment: '任务执行结果'
  },
  error: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '异常信息'
  },
  times: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '耗时(毫秒)'
  }
}, { tableName: 'schedule_job_log', updatedAt: false })

ScheduleJobLog.sync()

module.exports = ScheduleJobLog