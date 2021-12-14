import request from '../utils/request'

// 用户相关请求模块

// 登录请求
export const login = (data) => {
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserProfile = (data) => {
  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile'
  })
}
