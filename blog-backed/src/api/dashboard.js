import request from '@/utils/request'

export async function getDashboard() {
  return await request({
    url: 'dashboard',
    method: 'GET'
  })
}
