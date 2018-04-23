import { SET_USER_INFO, CLEAR_USER_INFO } from 'constants/user'
import { getUserInfo as getUserInfoApi } from './../../api/user'

export const setUserInfo = data => ({
  type: SET_USER_INFO,
  data
})

export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO
})

export function getUserInfo() {
  return dispatch => {
    getUserInfoApi().then(res => {
      dispatch(setUserInfo(res.data))
    }).catch(err => {
      console.log(err)
    })
  }
}
