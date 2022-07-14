module.exports = {
  // 用户错误
  userFormatError: {
    code: '10001',
    message: '用户名或密码为空',
    result: ''
  },
  userAlreadyExisted: {
    code: '10002',
    message: '用户名已存在',
    result: ''
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册错误！',
    result: ''
  },
  userNotExist: {
    code: '10004',
    message: '用户不存在!',
    result: ''
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败！',
    result: ''
  },
  invaildPassword: {
    code: '10006',
    message: '密码错误',
    result: ''
  },
  // 授权(token)错误
  TokenExpiredError: {
    code: '10101',
    message: 'token已过期',
    result: ''
  },
  invaildToken: {
    code: '10102',
    message: '无效的token',
    result: ''
  },
  hasNotAdminPermission: {
    code: '10103',
    message: '没有管理员权限',
    result: ''
  },
  changePasswordError: {
    code: '10104',
    message: '密码修改失败',
    result: ''
  },
  // 商品
  fileUploadError: {
    code: '10201',
    message: '商品图片上传失败',
    result: ''
  },
  // 无效的文件类型
  unSupportedFileType: {
    code: '10202',
    message: '不支持的文件类型',
    result: ''
  },
  goodsFormatError: {
    code: '10203',
    message: '商品参数格式错误',
    result: ''
  },
  publishGoodsError: {
    code: '10204',
    message: '发布商品失败',
    result: ''
  },
  invaildGoodsId: {
    code: '10205',
    message: '无效的商品id',
    result: ''
  },
  GoodsNotExisted: {
    code: '10206',
    message: '商品已下架或不存在',
    result: ''
  },
  // 购物车模块
  cartFormatError: {
    code: '10301',
    message: '购物车参数格式错误',
    result: ''
  },
  // 地址模块
  addressFormatError: {
    code: '10401',
    message: '地址参数格式错误',
    result: ''
  },

  // 订单模块
  orderFormatError: {
    code: '10501',
    message: '订单参数格式错误',
    result: ''
  }
}