// 文章相关请求模块

import request from '../utils/request'

// 获取文章相关列表
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

// 获取文章相关频道
export const getArticlesChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const deleteArticle = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 添加文章
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}

// 编辑文章
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}

// 查询指定文章
export const getArticle = (articleId) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 上传图片
export const uploadImage = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}

// 上传图片
export const getImage = (params, data) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params,
    data
  })
}
