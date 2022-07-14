import request from '@/utils/request'

export async function getCommentListByQuery(token: string, query: object | any) {
  return await request({
    url: 'comments',
    method: 'GET',
    headers: {
      Authorization: token,
    },
    params: { ...query },
  })
}

export async function submitComment(token: string, form: object) {
  return await request({
    url: 'comment',
    method: 'POST',
    headers: {
      Authorization: token,
    },
    data: { ...form },
  })
}
