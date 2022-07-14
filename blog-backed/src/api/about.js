import request from '@/utils/request'

// 获取信息
export async function getAbout() {
  return await request({
    url: 'about',
    method: 'GET'
  })
}

export async function updateAbout(form) {
  return await request({
    url: 'about',
    method: 'PUT',
    data: form
  })
}

