const { getTagListByBlogId } = require('../service/tag.service')
const md = require('../plugins/markdown')
// 格式化时间
function formatDate(date, fmt) {
  date = new Date(date)
  return date.getFullYear() + '年' + date.getMonth() + 1 + '月'
}

// 设置tags
async function setTags(blogLIst) {
  for (let i = 0; i < blogLIst.length; i++) {
    blogLIst[i]['tags'] = await getTagListByBlogId(blogLIst[i].id)
  }
}

// markdown转html
function setMDToHTML(obj, type) {
  switch (type) {
    case 'blog': obj.content = md.render(obj.content); break
    case 'about': obj.value = md.render(obj.value); break
    case 'description': {
      if (obj.length === 0) return
      obj.forEach(item => {
        item.description = md.render(item.description)
      })
      break
    }
  }
}

// 将数据库的0 1转为布尔值
 function setNumToBoolean(datas, type, keys) {
  if (type === 'list') {
    datas.forEach(data => {
      keys.forEach(key => {
        data[key] = !!data[key] ? true : false
      })
    })
  }

  if (type === 'object') {
    keys.forEach(key => {
      datas[key] = !!datas[key] ? true : false
    })
  }
}

module.exports = {
  setTags,
  setMDToHTML,
  formatDate,
  setNumToBoolean
}