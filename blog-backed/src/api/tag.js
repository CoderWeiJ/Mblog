import request from '@/utils/request'

// 获取标签信息
export async function getData(queryInfo) {
  return await request({
    url: 'tag',
    method: 'GET',
    params: queryInfo
  })
}

// 添加标签
export async function addTag(form) {
  return await request({
    url: 'tag',
    method: 'POST',
    data: form
  })
}

// 编辑标签
export async function editTag(form) {
  return await request({
    url: 'tag',
    method: 'PUT',
    data: form
  })
}

// 通过id删除标签
export async function deleteTagById(id) {
  return await request({
    url: 'tag',
    method: 'DELETE',
    data: { id }
  })
}
