import axios from 'axios'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    try {
      return JSONbig.parse(data)
    } catch (e) {
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // console.log(config)
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  return config
},
(err) => {
  return Promise.reject(err)
})

export default request
