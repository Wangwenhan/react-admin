/**
 * 封装axios 添加拦截器
 */

import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 20000 // 超时时间
})

export default service
