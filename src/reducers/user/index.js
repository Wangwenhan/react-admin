import { SET_USER_INFO } from './../../constants/user'

const userInfo = {}

const user = (state = userInfo, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, ...action.data }
    default:
      return state
  }
}

export default user