import { TOGGLE_MENU_COLLAPSED } from 'constants/app'

const appData = {
  isMenuCollapsed: false // 菜单栏是否收起
}

const app = (state = appData, action) => {
  switch (action.type) {
    case TOGGLE_MENU_COLLAPSED:
      return { ...appData, isMenuCollapsed: action.state }
    default:
      return state
  }
}
export default app