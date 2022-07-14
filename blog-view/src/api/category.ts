import request from '@/utils/request'

export async function getBlogListByCategoryName(categoryName: string, pageNum: number) {
  return await request({
    url: '/category',
    method: 'GET',
    params: {
      categoryName,
      pageNum
    }
  })
}
