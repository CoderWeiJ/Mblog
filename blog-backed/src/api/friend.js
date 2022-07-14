import request from '@/utils/request'

// 通过搜索框查询友链
export async function getFriendsByQuery(queryInfo) {
  return await request({
    url: 'friends',
    method: 'GET',
    params: queryInfo
  })
}

// 更新友链是否公开
export async function updatePublished(id, is_published) {
  
  return await request({
    url: 'friend/published',
    method: 'PUT',
    data: { id, is_published }
  })
}

export async function saveFriend(form) {
  return await request({
    url: 'friend',
    method: 'POST',
    data: form
  })
}

// 更新友链信息
export async function updateFriend(form) {
  return await request({
    url: 'friend',
    method: 'PUT',
    data: form
  })
}

// 通过id删除友链
export async function deleteFriendById(id) {
  return await request({
    url: 'friend',
    method: 'DELETE',
    params: { id }
  })
}

// 获取友链评论信息
export async function getFriendInfo(commentEnabled) {
  return await request({
    url: 'friendInfo',
    method: 'GET'    
  })
}

// 更新内容
export async function updateContent(content) {
  return await request({
    url: 'friendInfo/content',
    method: 'PUT',
    data: { content }
  })
}

// 更新友链评论开关
export async function updateCommentEnabled(commentEnabled) {
  return await request({
    url: '/friendInfo/commentEnabled',
    method: 'PUT',
    data: { commentEnabled }
  })
}