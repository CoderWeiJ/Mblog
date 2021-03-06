
// markdown插件
const hljs = require('highlight.js')
const uslug = require('uslug')
const uslugify = s => uslug(s)
const emoji = require('markdown-it-emoji')
const attrs = require('markdown-it-attrs')
const md = require('markdown-it')({
  anchors: true,
  html: false,        // 在源码中启用 HTML 标签
  xhtmlOut: false,        // 使用 '/' 来闭合单标签 （比如 <br />）。
  // 这个选项只对完全的 CommonMark 模式兼容。
  breaks: false,        // 转换段落里的 '\n' 到 <br>。
  langPrefix: 'language-',  // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
  linkify: false,        // 将类似 URL 的文本自动转换为链接。

  // 启用一些语言中立的替换 + 引号美化
  typographer: false,

  // 双 + 单引号替换对，当 typographer 启用时。
  // 或者智能引号等，可以是 String 或 Array。
  //
  // 比方说，你可以支持 '«»„“' 给俄罗斯人使用， '„“‚‘'  给德国人使用。
  // 还有 ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] 给法国人使用（包括 nbsp）。
  quotes: '“”‘’',

  // 高亮函数，会返回转义的HTML。
  // 或 '' 如果源字符串未更改，则应在外部进行转义。
  // 如果结果以 <pre ... 开头，内部包装器则会跳过。
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (error) {
        console.error('高亮错误：', error)
      }
    }
    return '' // 使用额外的默认转义
  }
}) // 这个插件可以让你支持内容块：比如 vuepress 的内容块：
  .use(require('markdown-it-container'), 'spoiler', {

    validate: function (params) {
      return params.trim().match(/^spoiler\s+(.*)$/)
    },

    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/)

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n'

      } else {
        // closing tag
        return '</details>\n'
      }
    }
  })
  .use(emoji)
  .use(require('markdown-it-anchor'), {
    slugify: uslugify,
  })
  .use(attrs, {
    allowedAttributes: ['id', 'class', /^target.*$/]
  })
// 给转换成a标签添加属性
// console.log(md.render('[百度一下](http://www.baidu.com){#red .green target=_blank}'))

/**
 * 给标签添加覆盖层
 * 这是一段普通的文字 {.m-text-cover}
 */
// md.renderer.rules.emoji = function (token, idx) {
//   return '<span class="emoji emoji_' + token[idx].markup + '"></span>'
// }

module.exports = md