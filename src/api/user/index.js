import axios from 'utils/ajax'

export function getUserInfo() {
  return axios({
    url: '/bomb/users/info',
    method: 'get'
  })
}