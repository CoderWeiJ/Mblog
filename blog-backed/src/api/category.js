import request from '@/utils/request'

// 获取类别数据
export async function getData(queryInfo) {
  return await request({
    url: 'category',
    method: 'GET',
    params: queryInfo
  })
}

// 添加类别
export async function addCategory(category) {
  return await request({
    url: 'category',
    method: 'POST',
    data: { category }
  })
}

// 编辑类别
export async function editCategory(category) {
  return request({
    url: 'category',
    method: 'PUT',
    data: { category }
  })
}

// 通过id删除类别
export async function deleteCategoryById(id) {
  return await request({
    url: 'category',
    method: 'DELETE',
    data: { id }
  })
}
