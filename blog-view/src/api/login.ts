import request from "@/utils/request"

export async function login(loginForm: Object) {
  return await request({
    url: '/login',
    method: 'POST',
    data: {
      ...loginForm
    }
  })
}