// 文章相关请求模块

import request from '../utils/request'

// 获取文章相关列表
export const getArticles = (params) => {
  return request({
    method: 'get',
    url: '/mp/v1_0/articles',
    params
  })
}

// 获取文章相关频道
export const getArticlesChannels = () => {
  return request({
    method: 'get',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const deleteArticle = (articleId) => {
  return request({
    method: 'delete',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
