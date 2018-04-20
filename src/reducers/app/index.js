import { TOGGLE_MENU_COLLAPSED } from 'constants/app'

const appInfo = {
  isMenuCollapsed: false // 菜单栏是否收起
}

const app = (state = appInfo, action) => {
  switch (action.type) {
    case TOGGLE_MENU_COLLAPSED:
      return { ...appInfo, isMenuCollapsed: action.state }
    default:
      return state
  }
}
export default app