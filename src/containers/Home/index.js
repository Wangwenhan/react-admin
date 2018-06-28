import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Layout, Spin, Modal } from 'antd';
import styles from './index.scss'
import Sidebar from './items/Sidebar'
import AppMain from './items/AppMain'
import Navbar from './items/Navbar';
import { getLocalStore, setLocalStore } from 'utils/storage'
import { toggleMenuCollapsed as toggleMenuCollapsedFromAction } from 'actions/app'
import { getUserInfo as getUserInfoFromAction, clearUserInfo as clearUserInfoFromAction } from 'actions/user'
import PropTypes from 'prop-types'
import _ from 'lodash'
import service from 'utils/ajax'

class Home extends Component {
  constructor(props) {
    super(props)
    this.registerAxiosInterceptors()
    const isMenuCollapsed = getLocalStore('react_admin_menu_collapsed') === 'true'
    this.props.toggleMenuCollapsed(isMenuCollapsed)
    this.SidebarElement = React.createRef()
    this.AppMainElement = React.createRef()
    if (_.isEmpty(this.props.userInfo)) {
      this.props.getUserInfo()
    }
    this.state = {
      collapsed: isMenuCollapsed
    }
  }
  
  registerAxiosInterceptors() {
    // request interceptor
    service.interceptors.request.use(config => {
      if (config.url.indexOf('/api/v1/graph') > -1) {
        config.headers.apiToken = "{\"Sig\":\"default-token-used-in-server-side\",\"Name\":\"csw\"}"
      }
      return config
    }, error => {
      // Do something with request error
      console.log(error) // for debug
      Promise.reject(error)
    })

    // respone interceptor
    service.interceptors.response.use(
      response => {
        if (response.headers['content-type'] === 'text/html' && response.headers['content-length']) {
          window.location.href = 'http://eip.htsc.com.cn'
          return
        }
        return response
      },
      error => {
        console.log('err' + error)// for debug
        // Message({
        //   message: error.message,
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        if (error.response) {
          switch (error.response.status) {
            case 403:
              // removeSessionStore('token')
              // removeLocalStore('token')
              this.props.clearUserInfo()
              if (window.location.href.indexOf('eip.htsc.com.cn') > 0) {
                // OA的403
                window.location.href = 'http://eip.htsc.com.cn'
                return
              }
              this.props.history.push(`/login?redirect=${encodeURIComponent(this.props.location.pathname)}`)
              break;
            default:
              if (error.response.headers['content-type'] === 'text/html' && error.response.headers['content-length']) {
                window.location.href = 'http://eip.htsc.com.cn'
                return
              }
              console.log('error %S', error.response.status)
              Modal.error({
                title: error.response.data.error,
                content: error.response.data.message
              })
          }
        }
        return Promise.reject(error)
      })
  }
  toggle() {
    this.setState((prevState => {
      return {
        collapsed: !prevState.collapsed
      }
    }))
    this.props.toggleMenuCollapsed(!this.state.collapsed)
    // 菜单收缩状态存入storage
    setLocalStore('react_admin_menu_collapsed', !this.state.collapsed)
  }
  addTab(path) {
    // 借助ref实现兄弟组件通信
    this.AppMainElement.current.addTab(path)
  }
  adjustSelectedMenu(path) {
    // 借助ref实现兄弟组件通信
    this.SidebarElement.current.adjustSelectedMenu(path)
  }
  render() {
    if (_.isEmpty(this.props.userInfo) || _.isEmpty(this.props.sideBarMenuData) || _.isEmpty(this.props.appMainMenuData)) {
      return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Spin size="large" />
        </div>
      )
    }
    const { collapsed } = this.state
    return (
      <Layout className={styles.home_wrapper}>
        <Sidebar
          ref={this.SidebarElement}
          collapsed={collapsed}
          menuData={this.props.sideBarMenuData}
          addTab={this.addTab.bind(this)}
          location={this.props.location}
        ></Sidebar>
        <Layout className={styles.work_space}>
          <AppMain ref={this.AppMainElement}
            collapsed={collapsed}
            toggle={this.toggle.bind(this)}
            location={this.props.location}
            history={this.props.history}
            adjustSelectedMenu={this.adjustSelectedMenu.bind(this)}
            menuData={this.props.appMainMenuData}
          ></AppMain>
          <Navbar
            userInfo={this.props.userInfo}
          ></Navbar>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    sideBarMenuData: state.user.sideBarMenuData,
    appMainMenuData: state.user.appMainMenuData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleMenuCollapsed: collapsed => {
      dispatch(toggleMenuCollapsedFromAction(collapsed))
    },
    getUserInfo: () => {
      dispatch(getUserInfoFromAction())
    },
    clearUserInfo: () => {
      dispatch(clearUserInfoFromAction())
    }
  }
}

Home.propTypes = {
  userInfo: PropTypes.object.isRequired,
  toggleMenuCollapsed: PropTypes.func.isRequired,
  clearUserInfo: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  sideBarMenuData: PropTypes.array.isRequired,
  appMainMenuData: PropTypes.object.isRequired
}

const connectHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default connectHome;
