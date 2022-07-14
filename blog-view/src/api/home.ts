import request from '@/utils/request'

export async function getBlogList(pageNum: number) {
  return await request({
    url: '/blogs',
    method: 'GET',
    params: { pageNum },
  })
}
