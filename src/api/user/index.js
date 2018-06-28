import axios from 'utils/ajax'

const basePath = process.env.NODE_ENV === 'production' ? '' : '/owl'

// 获取用户信息
export function getUserInfo() {
  return axios({
    url: `${basePath}/api/baseMonWeb/v1/users/getCurrentUser`,
    method: 'get'
  })
}

// 登录
export function loginSystem(data) {
  return axios({
    url: `${basePath}/login`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取页面主菜单
export function getMenu(params) {
  return axios({
    url: `${basePath}/api/baseMonWeb/v1/menus/getMenu`,
    method: 'get',
    params
  })
}