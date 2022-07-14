import request from '@/utils/request'

export async function getData() {
  return request({
    url: 'friends',
    method: 'GET',
  })
}

export async function addViewsByNickname(nickname: string) {
  return request({
    url: 'frined',
    method: 'POST',
    data: {
      nickname,
    },
  })
}
