import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Layout } from 'antd';
import styles from './index.scss'
import Sidebar from './subpages/Sidebar'
import Navbar from './subpages/Navbar'
import AppMain from './subpages/AppMain'
import { getLocalStore, setLocalStore } from 'utils/storage'
import { toggleMenuCollapsed } from 'actions/app'
import PropTypes from 'prop-types'

class Home extends Component {
  constructor(props) {
    super(props)
    const isMenuCollapsed = getLocalStore('react_admin_menu_collapsed') === 'true'
    this.props.toggleMenuCollapsed(isMenuCollapsed)
  }
  toggle() {
    // 菜单收缩状态存入storage
    setLocalStore('react_admin_menu_collapsed', !this.props.collapsed)
    this.props.toggleMenuCollapsed(!this.props.collapsed)
  }
  render() {
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
    collapsed: state.app.isMenuCollapsed
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleMenuCollapsed: collapsed => {
      dispatch(toggleMenuCollapsed(collapsed))
    }
  }
}

Home.propTypes = {
  toggleMenuCollapsed: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired
}

const connectHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default connectHome;
