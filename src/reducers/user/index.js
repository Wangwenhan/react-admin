import { SET_USER_INFO, CLEAR_USER_INFO, SET_SIDE_BAR_MENU, SET_APP_MAIN_MENU, CHANGE_ACTIVE_KEY } from './../../constants/user'

const userData = {
  userInfo: {},
  sideBarMenuData: [],
  appMainMenuData: {},
  activeKey: 'dashboard'
}

const user = (state = userData, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, userInfo: action.data }
    case CLEAR_USER_INFO:
      return { 
        userInfo: {},
        sideBarMenuData: [],
        appMainMenuData: {},
        activeKey: 'dashboard' 
      }
    case SET_SIDE_BAR_MENU:
      return {
        ...state,
        sideBarMenuData: [{ name: '监控首页', path: 'dashboard', icon: 'homepage', children: null, page: './Dashboard' }
          , ...action.data]
      }
    case SET_APP_MAIN_MENU:
      return {
        ...state,
        appMainMenuData: {
          ...action.data,
          dashboard: { name: '监控首页', path: 'dashboard', icon: 'homepage', children: null, page: './Dashboard' }
        }
      }
    case CHANGE_ACTIVE_KEY:
      return { ...state, activeKey: action.data }
    default:
      return state
  }
}

export default user