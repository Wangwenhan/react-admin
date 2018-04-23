import axios from 'utils/ajax'

export function getUserInfo() {
  return axios({
    url: '/bomb/users/info',
    method: 'get'
  })
}

export function loginSystem(data) {
  return axios({
    url: `/bomb/users/login`,
    method: 'post',
    data
  })
}