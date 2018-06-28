import { SET_USER_INFO, CLEAR_USER_INFO, SET_SIDE_BAR_MENU, SET_APP_MAIN_MENU, CHANGE_ACTIVE_KEY } from 'constants/user'
import { getUserInfo as getUserInfoApi, getMenu as getMenuApi } from './../../api/user'
import _ from 'lodash'

export const setUserInfo = data => ({
  type: SET_USER_INFO,
  data
})

export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO
})

export function fedLogout() {
  return dispatch => {
    dispatch(clearUserInfo())
  }
}

const setSideBarMenu = (data) => ({
  type: SET_SIDE_BAR_MENU,
  data
})

const setAppMainMenu = (data) => ({
  type: SET_APP_MAIN_MENU,
  data
})

export function getUserInfo() {
  return dispatch => {
    getUserInfoApi().then(res => {
      dispatch(setUserInfo(res.data))
      dispatch(getMenu(res.data.username))
    }).catch(err => {
      console.log(err)
    })
  }
}

export const changeActiveKey = data => ({
  type: CHANGE_ACTIVE_KEY,
  data
})

function getMenu(username) {
  if (process.env.NODE_ENV === 'production' && window.location.href.indexOf('168.61.45.7:9999') === -1) {
  // if (process.env.NODE_ENV === 'development') {
    return dispatch => {
      getMenuApi({ username }).then(res => {
        const data = []
        const showMenuRootPathArr = ['dataAnalysisCenter', 'vmManagement', 'alarmConsole', 'loadBalanceMonitoringPage', 'networkQualityPerception']
        showMenuRootPathArr.forEach(path => {
          const menuData = res.data.data.find(item => {
            return item.path === path
          })
          if (menuData) {
            data.push(menuData)
          }
        })
        const sideBarMenuData = formatSideBarMenuData(data)
        const appMainMenuData = formatAppMainMenuData(sideBarMenuData)
        dispatch(setSideBarMenu(sideBarMenuData))
        dispatch(setAppMainMenu(appMainMenuData))
      }).catch(err => {
        console.log(err)
      })

    }
  }
  return dispatch => {
    getMenuApi({ username }).then(res => {
      const sideBarMenuData = formatSideBarMenuData(res.data.data)
      const appMainMenuData = formatAppMainMenuData(sideBarMenuData)
      dispatch(setSideBarMenu(sideBarMenuData))
      dispatch(setAppMainMenu(appMainMenuData))
    }).catch(err => {
      console.log(err)
    })
  }
}

function formatSideBarMenuData(menuData, parentPath = '') {
  return menuData.map(item => {
    if (item.children) {
      return {
        ...item,
        path: `${parentPath + item.path}`,
        name: item.title,
        children: formatSideBarMenuData(item.children, `${parentPath + item.path}/`)
      }
    }
    return {
      ...item,
      path: `${parentPath + item.path}`,
      name: item.title,
    }
  })
}
function formatAppMainMenuData(menuData) {
  let allMenuData = {}
  menuData.forEach(item => {
    if (_.isEmpty(item.children)) {
      allMenuData[item.path] = item
    } else {
      allMenuData = { ...allMenuData, ...formatAppMainMenuData(item.children) }
    }
  })
  return allMenuData
}
