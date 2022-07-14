import request from '@/utils/request'

// 通过搜索框查找
export async function getDataByQuery(queryInfo) {
  return await request({
    url: 'blogs',
    method: 'GET',
    params: queryInfo
  })
}

// 通过id删除博客
export async function deleteBlogById(id) {
  return await request({
    url: `blog/${id}`,
    method: 'DELETE',
  })
}

// 获取类别和标签
export async function getCategoryAndTag() {
  return await request({
    url: '/categoryAndTag',
    method: 'GET'
  })
}

// 保存博客
export async function saveBlog(blog) {
  return await request({
    url: 'blog',
    method: 'POST',
    data: blog
  })
}

// 设置博客置顶
export async function updateTop(id, top) {
  return await request({
    url: 'blog/top',
    method: 'PUT',
    params: { id, top }
  })
}

// 设置推荐
export async function updateRecommend(id, recommend) {
  return await request({
    url: 'blog/recommend',
    method: 'PUT',
    params: { id, recommend }
  })
}

// 设置博客是否可见
export async function updateVisibility(id, form) {
  console.log('参数打印：', form);
  return await request({
    url: `blog/visibility`,
    method: 'PUT',
    params: {id, form}
  })
}

// 通过id获取博客信息
export async function getBlogById(id) {
  return await request({
    url: 'blog',
    method: 'GET',
    params: { id }
  })
}

// 更新博客信息
export async function updateBlog(blog) {
  return await request({
    url: 'blog',
    method: 'PUT',
    data: blog
  })
}