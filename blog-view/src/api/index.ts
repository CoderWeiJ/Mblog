import request from '@/utils/request'

export async function getHiToKoTo() {
  return await request({
    url: 'https://v1.hitokoto.cn/?c=a',
    method: 'GET',
  })
}

export async function getSite() {
  return await request({
    url: '/site',
    method: 'GET',
  })
}
