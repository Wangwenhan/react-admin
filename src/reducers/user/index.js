import { SET_USER_INFO, CLEAR_USER_INFO } from './../../constants/user'

const userData = {
  userInfo: {}
}

const user = (state = userData, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, ...{ userInfo: action.data } }
    case CLEAR_USER_INFO:
      return { ...state, ...{ userInfo: {} } }
    default:
      return state
  }
}

export default user