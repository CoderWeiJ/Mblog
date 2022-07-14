import request from '@/utils/request'

// 获取站点设置信息
export async function getSiteSettingData() {
  return await request({
    url: 'site',
    method: 'GET'
  })
}

// 更新站点信息
export async function update(settings, deleteIds) {
  return await request({
    url: 'site',
    method: 'PUT',
    data: { settings, deleteIds }
  })
}

// 获取站点标题
export async function getWebTitleSuffix() {
  return await request({
    url: 'site/webTitleSuffix',
    method: 'GET'
  })
}

