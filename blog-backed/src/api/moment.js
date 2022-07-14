import request from '@/utils/request'

// 通过搜索框搜素动态信息
export async function getMomentListByQuery(queryInfo) {
  return await request({
    url: 'moments',
    method: 'GET',
    params: queryInfo
  })
}

// 设置是否公开
export async function updatePublished(id, is_published) {
  return await request({
    url: 'moment/published',
    method: 'PUT',
    data: { id, is_published }
  })
}

// 通过id获取动态
export async function getMomentById(id) {
  return await request({
    url: 'moment',
    method: 'GET',
    params: { id }
  })
}

// 通过id删除动态
export async function deleteMomentById(id) {
  return await request({
    url: 'moment',
    method: 'DELETE',
    params: { id }
  })
}

// 保存动态
export async function saveMoment(moment) {
  return await request({
    url: 'moment',
    method: 'POST',
    data: moment
  })
}

// 更新动态
export async function updateMoment(moment) {
  return await request({
    url: 'moment',
    method: 'PUT',
    data: moment
  })
}
