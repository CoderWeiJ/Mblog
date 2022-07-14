const { redisClient } = require('../db/database')

/**
 * 从 redis 里查是否有改数据，没有再从 mysql 里查
 * API -> Redis ? '结果' : '从数据库查，加载到 redis 里'
 */