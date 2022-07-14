import request from '@/utils/request'

export async function getMomentListByPageNum(token: string, pageNum: number) {
  return await request({
    url: 'moments',
    method: 'GET',
    headers: {
      Authorization: token,
    },
    params: { pageNum },
  })
}

export async function likeMoment(id: any) {
  return await request({
    url: `moment/like/${id}`,
    method: 'POST',
  })
}
