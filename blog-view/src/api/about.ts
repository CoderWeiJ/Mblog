import request from "@/utils/request";

export async function getAbout() { 
  return await request({
    url: 'about',
    method: 'GET'
  })
}