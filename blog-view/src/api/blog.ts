import request from '@/utils/request'

export async function getBlogById(token: string, id: number) {
  return await request({
    url: '/blog',
    method: 'GET',
    headers: {
      Authorization: token,
    },
    params: { id },
  })
}

export async function checkBlogPassword(blogPasswordForm: Array<string> | object | any) {
  return await request({
    url: 'blog/checkBlogPassword',
    method: 'POST',
    data: {
      ...blogPasswordForm,
    },
  })
}

export async function getSearchBlogList(query: string) {
  return await request({
    url: '/searchBlog',
    method: 'GET',
    params: {
      query,
    },
  })
}
