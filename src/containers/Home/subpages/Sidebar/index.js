import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './index.scss'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash'
import { Layout, Menu, Spin } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;
import logoPng from 'assets/layout/sidebarLogo.png'
import IconSvg from 'components/IconSvg'
// 取得假数据 可根据需求调整为服务端获取或静态配置
import { menuData } from './../../../../config/menuMock'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    // submenu keys of first level
    this.state = {
      currentMenu: ['dashboard'],
      openKeys: ['table', 'table1'],
    };
  }
  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (menuData.findIndex(item => {
      return item.path === latestOpenKey
    }) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  getMenu(menuData, basePath) {
    if (_.isEmpty(menuData)) {
      return []
    }
    return menuData.map(item => {
      if (!item.name) {
        return null
      }
      let icon = <IconSvg iconClass={item.icon} className={styles.sidebar_icon} />
      if (item.children && !_.isEmpty(item.children)) {
        return item.hideInMenu ? null :
          (
            <SubMenu title={
              <span>
                {icon}
                <span>{item.name}</span>
              </span>
            }
              key={item.key || item.path}
            >
              {this.getMenu(item.children, `${basePath + item.path}/`)}
            </SubMenu>
          )
      }
      return item.hideInMenu ? null :
        (
          <Menu.Item key={item.key || item.path}>
            <Link
              to={`/home/${basePath + item.path}`}
              replace={`/home/${basePath + item.path}` === this.props.location.pathname}
            >
              {icon}
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        )
    })
  }
  render() {
    const menuProps = this.props.collapsed ? {} : {
      openKeys: this.state.openKeys,
      defaultOpenKeys: ['sub1']
    }
    const selectedKeys = this.state.currentMenu
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        className={styles.sidebar_wrapper}
        width={256}
      >
        <div className={styles.logo}>
          <Link to="/">
            <img src={logoPng} alt="logo" />
            <h1>React Admin</h1>
          </Link>
        </div>
        {_.isEmpty(menuData) ?
          <Spin size="large" style={{ marginTop: '30vh', width: '100%' }} />
          : (<Menu
            selectedKeys={selectedKeys}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.props.collapsed}
            onOpenChange={this.onOpenChange.bind(this)}
            {...menuProps}
            className={styles.menu}
          >
            {this.getMenu(menuData, '')}
          </Menu>)
        }
      </Sider>
    );
  }
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
}

export default withRouter(Sidebar);
