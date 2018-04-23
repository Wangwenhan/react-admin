import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './index.scss'
import { Layout, Icon, Menu, Dropdown, Avatar } from 'antd';
const { Header } = Layout;
import userPng from 'assets/user/user.jpeg'
import { fedLogout as fedLogoutFromAction } from './../../../../actions/user'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }
  onMenuClick({ key }) {
    switch (key) {
      case 'modify':
        this.props.history.push('/modify')
        break;
      case 'logout':
        this.props.fedLogout()
        this.props.history.push(`/login?redirect=${encodeURIComponent(this.props.location.pathname)}`)
        break;
    }
  }
  render() {
    const menu = (
      <Menu onClick={this.onMenuClick.bind(this)}>
        <Menu.Item key="modify"><Icon type="key" />修改密码</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    )
    return (
      <Header className={styles.navbar_container}>
        <Icon
          className={styles.trigger}
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
        <div className={styles.right_option}>
          <Dropdown overlay={menu}>
            <a className={styles.avatar_wrapper}>
              <Avatar src={userPng} />&nbsp;
              <span>{this.props.userInfo.name}</span>&nbsp;
              <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </Header>
    );
  }
}

Navbar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  fedLogout: PropTypes.func.isRequired
}

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fedLogout: () => {
      dispatch(fedLogoutFromAction())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
