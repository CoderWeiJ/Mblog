const { redisClient } = require('../db/database')

/**
 * @Description: 读写Redis相关操作
 * @Author: CoderWeiJ
 * @Date: 2022-01-25
 */

class RedisService {

  // 首页博客简介列表缓存
  getBlogInfoPageResultByHash = async (hash, pageNum) => {
    // 如果有这个key，就拿值
    if (await this.hasKey(hash)) {
      const res = await this.getHashData(hash, pageNum)
      return JSON.parse(res)
    } else return null
  }

  // redis里是否有key
  async hasKey(key) {
    return await new Promise((resolve, reject) => {
      redisClient.keys(key, (err, res) => {
        resolve(res[0])
      })
    })
  }


  // 根据key、field获取hash值
  async getHashData(key, field) {
    return await new Promise((resolve, reject) => {
      redisClient.hget(key, field, (err, res) => {
        resolve(res)
      })
    })
  }

  // 将浏览量保存到redis
  async saveMapToHash(hash, map) {
    for(let key in map)
    map.forEach((value, key) => {
      redisClient.hset(hash, key, JSON.stringify(value))
    })
  }

  // 
  async saveKVToHash(hash, key, value) {
    redisClient.hset(hash, key, JSON.stringify(value))
  }

  // 根据key获取值
  async getListByValue(key) {
    return await new Promise((resolve, reject) => {
      redisClient.get(key, (err, res) => {
        resolve(JSON.parse(res))
      })
    })
  }

  // 
  async saveListToValue(key, list) {
    redisClient.set(key, JSON.stringify(list))
  }

  async getMapByValue(key) {
    return await new Promise((resolve, reject) => {
      redisClient.get(key, (err, res) => {
        resolve(JSON.parse(res))
      })
    })
  }

  /**
   * 
   * @param {String} key 
   * @param {Object} map 不是Map对象
   */
  async saveMapToValue(key, map) {
    redisClient.set(key, JSON.stringify(map))
  }

  async deleteByHashKey(key, field) {    
    redisClient.hdel(key, field)
  }

  async deleteCacheByKey(key) {
    redisClient.del(key)
  }

  // getObjectByValue = async (key, t) =>{
  //   const redisResult = await this.getMapByValue(key)

  // }


  async incrementByHashKey(key, field, increment) {
    if (increment < 0) throw '递增因子必须大于0'
    redisClient.hincrby(key, field, increment)
  }

  async getValueByHashKey(key, id) {
    return await new Promise((resolve, reject) => {
      redisClient.hget(key, id, (err, res) => {
        resolve(JSON.parse(res))
      })
    })
  }


}

module.exports = new RedisService()