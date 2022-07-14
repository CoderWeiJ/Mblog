const { Sequelize, QueryTypes } = require('sequelize')
const redis = require('redis')

const { MYSQL_DB, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_HOST } = require('../config/default.config.js')

const redisClient = redis.createClient({
  port: REDIS_PORT,
  host: REDIS_HOST,
  // auth_pass: REDIS_PASSWORD
})
redisClient.on('connect', () => { console.log('redis连接成功') })
redisClient.on('error', (error) => { console.log('redis连接异常: ', error) })

const mysqlClient = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
})
async function a() {
  // console.log('结果：', await mysqlClient.query(`update blog set title='阿巴阿巴' where id=2`, {type: QueryTypes.UPDATE}));
  console.log('redis:', await redisClient.hincrby('user', 'id', 2));
}
// a()
module.exports = { mysqlClient, redisClient }
