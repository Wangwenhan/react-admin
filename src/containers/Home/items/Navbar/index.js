import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './index.scss'
import { Layout, Icon, Menu, Dropdown, Avatar } from 'antd';
const { Header } = Layout;
import { fedLogout as fedLogoutFromAction } from 'actions/user'
import ScreenFull from './../../../../components/ScreenFull'

class Navbar extends PureComponent {
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
        this.props.history.push(`/login`)
        break;
    }
  }
  render() {
    const menu = (
      <Menu className={styles.menu} onClick={this.onMenuClick.bind(this)}>
        {/*<Menu.Item key="modify"><Icon type="key" />&nbsp;修改密码</Menu.Item>
        <Menu.Divider />*/}
        <Menu.Item key="logout"><Icon type="logout" />&nbsp;退出登录</Menu.Item>
      </Menu>
    )
    return (
      <Header className={styles.navbar_container}>
        <div className={styles.right_option}>
          <ScreenFull/>
          <Dropdown overlay={menu}>
            <div className={styles.avatar_wrapper}>
              <Avatar style={{ backgroundColor: 'lightskyblue' }} icon="user" />&nbsp;
              <span>{this.props.userInfo.username}</span>&nbsp;
              <Icon type="down" />
            </div>
          </Dropdown>
        </div>
      </Header>
    );
  }
}

Navbar.propTypes = {
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
