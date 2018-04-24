import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Layout, Spin } from 'antd';
import styles from './index.scss'
import Sidebar from './subpages/Sidebar'
import AppMain from './subpages/AppMain'
import Navbar from './subpages/Navbar';
import { getLocalStore, setLocalStore } from 'utils/storage'
import { toggleMenuCollapsed as toggleMenuCollapsedFromAction } from 'actions/app'
import { getUserInfo as getUserInfoFromAction, clearUserInfo as clearUserInfoFromAction } from 'actions/user'
import PropTypes from 'prop-types'
import _ from 'lodash'
import service from './../../utils/ajax'

class Home extends Component {
  constructor(props) {
    super(props)
    const isMenuCollapsed = getLocalStore('react_admin_menu_collapsed') === 'true'
    this.props.toggleMenuCollapsed(isMenuCollapsed)
  }
  componentWillMount() {
    // request interceptor
    service.interceptors.request.use(config => {
      // 此处为请求拦截器 可以添加诸如token的相关逻辑
      // if (store.getters.loginState) {
      //   const token = getSessionStore('token') || getLocalStore('token')
      //   config.headers.Authorization = token || ''
      // }
      return config
    }, error => {
      // Do something with request error
      console.log(error) // for debug
      Promise.reject(error)
    })

    // respone interceptor
    service.interceptors.response.use(
      response => response,
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
              this.props.history.push(`/login?redirect=${encodeURIComponent(this.props.location.pathname)}`)
              break;
            default:
              console.log('error %S', error.response.status)
          }
        }
        return Promise.reject(error)
      })
    if (_.isEmpty(this.props.userInfo)) {
      this.props.getUserInfo()
    }
  }
  toggle() {
    // 菜单收缩状态存入storage
    setLocalStore('react_admin_menu_collapsed', !this.props.collapsed)
    this.props.toggleMenuCollapsed(!this.props.collapsed)
  }
  render() {
    if (_.isEmpty(this.props.userInfo)) {
      return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Spin size="large" />
        </div>
      )
    }
    return (
      <Layout className={styles.home_wrapper}>
        <Sidebar collapsed={this.props.collapsed}></Sidebar>
        <Layout className={styles.work_space}>
          <Navbar collapsed={this.props.collapsed} userInfo={this.props.userInfo} toggle={this.toggle.bind(this)}></Navbar>
          <AppMain></AppMain>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collapsed: state.app.isMenuCollapsed,
    userInfo: state.user.userInfo
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
  collapsed: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
  toggleMenuCollapsed: PropTypes.func.isRequired,
  clearUserInfo: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

const connectHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default connectHome;
