# 简介

koa2 + vue3 博客系统

本项目是由[Naccl](https://github.com/Naccl/NBlog)大佬的项目改造而成的，vue3+ts对当时的我来说，是比较陌生的，很多都是一边做一边学，所以不足之处请多指教。

koa2也是自己参照大佬的Java项目做的，其中很多Java的包都没有找到好的替代，所以可能有很多隐藏bug。

后台管理系统删减了很多功能，后续有精力的话会继续晚上。

预览地址：

- 前台：http://120.25.206.229:5001
- 后台：http://120.25.206.229:5112

# 后端

1. 核心框架：[koa2](https://koa.bootcss.com/)
2. 数据库操作：[mysql2](https://www.npmjs.com/package/mysql2)
3. MarkDown转HTML：[markdown-it](https://www.npmjs.com/package/markdown-it)、[markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor)、[markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs)、[markdown-it-container](https://www.npmjs.com/package/markdown-it-container)、[markdown-it-emoji](https://www.npmjs.com/package/markdown-it-emoji)
4. NoSQL缓存：[Redis](https://www.redis.net.cn/)

# 前端

**核心框架：**vue3+vue-router4+vuex4

JS 依赖及参考的 css：[axios](https://github.com/axios/axios)、[moment](https://github.com/moment/moment)、[nprogress](https://github.com/rstacruz/nprogress)、[v-viewer](https://github.com/fengyuanchen/viewerjs)、[prismjs](https://github.com/PrismJS/prism)、[APlayer](https://github.com/DIYgod/APlayer)、[MetingJS](https://github.com/metowolf/MetingJS)、[lodash](https://github.com/lodash/lodash)、[mavonEditor](https://github.com/hinesboy/mavonEditor)、[echarts](https://github.com/apache/echarts)、[tocbot](https://github.com/tscanlin/tocbot)、[iCSS](https://github.com/chokcoco/iCSS)

### 后台 UI

后台基于 [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)开发，UI框架为[Element UI](https://github.com/ElemeFE/element)

### 前台 UI

[Semantic UI](https://semantic-ui.com/)：主要使用，页面布局样式，个人感觉挺好看的 UI 框架，比较适合前台界面的开发，语义化的 css，前一版博客系统使用过，可惜该框架 Vue 版的开发完成度不高，见 [Semantic UI Vue](https://semantic-ui-vue.github.io/#/)

文章排版：基于 [typo.css](https://github.com/sofish/typo.css) 修改

# 开发环境

1. 创建 MySQL 数据库`mblog`，并执行`/blog-api/mblog.sql`初始化表数据
2. 安装 Redis 并启动
3. 启动后端服务
4. 分别在`blog-backed`和`blog-view`目录下执行`npm install`安装依赖
5. 分别在`blog-backed`和`blog-view`目录下执行`npm run serve`启动前后台页面（yarn/npm）

# 注意事项

- MySQL 确保数据库字符集为`utf8mb4`（”站点设置“及”文章详情“等许多表字段需要`utf8mb4`格式字符集来支持 emoji 表情，否则在导入 sql 文件时，即使成功导入，也会有部分字段内容不完整，导致前端页面渲染数据时报错）

- 如需部署，注意将`/blog-view/src/utils/request.ts`和`/blog-backed/src/util/request.js`中的`baseUrl`修改为你的后端 API 地址