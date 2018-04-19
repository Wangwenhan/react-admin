/**
 * 封装axios 添加拦截器
 * @author Wangwenhan <nj.wangwenhan@gmail.com>
 */

import axios from 'axios'
import { getLocalStore, getSessionStore, removeSessionStore, removeLocalStore } from 'utils/storage'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.getters.loginState) {
  //   const token = getSessionStore('token') || getLocalStore('token')
  //   config.headers.Authorization = token || ''
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    if (error.response) {
      switch (error.response.status) {
        case 401:
          removeSessionStore('token')
          removeLocalStore('token')
          break;
        default:
          console.log('error %S', error.response.status)
      }
    }
    return Promise.reject(error)
  })

export default service
