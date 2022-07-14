/**
 * adminToken、blogToken等验证
 */
const jwt = require('jsonwebtoken')
const { ADMIN_TOKEN, BLOG_TOKEN } = require('../config/default.config')

async function adminToken(ctx, next) {
  const { authorization = ''} = ctx.request.header
  const token = authorization.replace('Bearer ', '') // 获取token
  try {
    // 里面包含了payload的信息
    const adminToken = jwt.verify(token, ADMIN_TOKEN)
    
  } catch (error) {
    
  }
}