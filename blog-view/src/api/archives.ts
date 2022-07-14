import request from '@/utils/request'

export async function getArchives() {
  return await request({
    url: 'archives',
    method: 'GET',
  })
}
