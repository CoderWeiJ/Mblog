const fs = require('fs');
const Router = require('koa-router');

const router = new Router();

// 读取当前目录下的路由文件，并加载到主路由且暴露出去
fs.readdirSync(__dirname).forEach(file => {
  // console.log(file);
  if (file !== 'index.js') {
    let r = require('./' + file);
    router.use(r.routes())
  }
});

module.exports = router;