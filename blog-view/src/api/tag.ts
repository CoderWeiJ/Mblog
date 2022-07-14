import request from '@/utils/request'
export async function getBlogListByTagName(tagName: string, pageNum: number) {
  return await request({
    url: 'tag',
    method: 'GET',
    params: {
      tagName,
      pageNum,
    },
  })
}
