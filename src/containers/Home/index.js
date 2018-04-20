import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Layout } from 'antd';
import styles from './index.scss'
import Sidebar from './subpages/Sidebar'
import Navbar from './subpages/Navbar'
import AppMain from './subpages/AppMain'
import { getLocalStore, setLocalStore } from 'utils/storage'
import { toggleMenuCollapsed as toggleMenuCollapsedFromAction } from 'actions/app'
import { getUserInfo as getUserInfoFromAction } from 'actions/user'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Home extends Component {
  constructor(props) {
    super(props)
    const isMenuCollapsed = getLocalStore('react_admin_menu_collapsed') === 'true'
    this.props.toggleMenuCollapsed(isMenuCollapsed)
  }
  componentWillMount() {
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
      return (<h1>loading</h1>)
    }
    return (
      <Layout className={styles.home_wrapper}>
        <Sidebar collapsed={this.props.collapsed}></Sidebar>
        <Layout>
          <Navbar collapsed={this.props.collapsed} toggle={this.toggle.bind(this)}></Navbar>
          <AppMain></AppMain>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collapsed: state.app.isMenuCollapsed,
    userInfo: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleMenuCollapsed: collapsed => {
      dispatch(toggleMenuCollapsedFromAction(collapsed))
    },
    getUserInfo: () => {
      dispatch(getUserInfoFromAction())
    }
  }
}

Home.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
  toggleMenuCollapsed: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired
}

const connectHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default connectHome;
