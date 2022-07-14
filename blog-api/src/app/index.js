const path = require('path');


const Koa = require('koa');
const cors = require('koa2-cors')
const KoaBody = require('koa-body'); // 消息中间件
const parameter = require('koa-parameter'); // 参数校验
const KoaStatic = require('koa-static'); //  静态文件服务中间件

const {
  errHandle
} = require('./errHandle.js'); // 异常处理

const app = new Koa();

const router = require('../router/index.js'); // 封装路由
const {
  CITEXT
} = require('sequelize/dist');
// 中间件
app
  .use(cors())
  .use(KoaBody({
    multipart: true, // 支持多文件上传
    formidable: {
      // 在配置选项里，不推荐使用相对路径
      // 在Options里的相对路径，不是相对当前文件的路径，而是相对process.cwd() => 执行脚本的路径
      uploadDir: path.join(__dirname, '../uploads'), // 上传路径
      keepExtensions: true, // 保留扩展名      
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET'],
  }))
  .use(parameter(app))
  .use(KoaStatic(path.join(__dirname, '../uploads'))) // 静态资源请求路径 localhost:8000/uploads/文件名
  .use(router.routes())
  .use(router.allowedMethods());

// 统一的错误处理
app.on('error', errHandle);
module.exports = app;