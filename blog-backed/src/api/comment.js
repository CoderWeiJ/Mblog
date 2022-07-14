import request from '@/utils/request'

// 通过搜索获取评论列表
export async function getCommentListByQuery(queryInfo) {
  return await request({
    url: 'comments',
    method: 'GET',
    params: queryInfo
  })
}

// 获取博客列表
export async function getBlogList() {
  return await request({
    url: 'blogIdAndTitle',
    method: 'GET'
  })
}

// 更新可见性
export async function updatePublished(id, published) {
  return await request({
    url: 'comment/published',
    method: 'PUT',
    params: { id, published }
  })
}

// 更新回复通知
export async function updateNotice(id, notice) {
  return await request({
    url: 'comment/notice',
    method: 'PUT',
    params: { id, notice }
  })
}

// 通过id删除评论
export async function deleteCommentById(id) {
  return await request({
    url: 'comment',
    method: 'DELETE',
    params: { id }
  })
}

// 编辑评论
export async function editComment(form) {
  return await request({
    url: 'comment',
    method: 'PUT',
    data: form
  })
}