import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './index.scss'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Layout, Menu, Spin } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;
import logoPng from 'assets/layout/sidebarLogo.png'
import IconSvg from 'components/IconSvg'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMenu: ['dashboard'],
      openKeys: [],
    };
  }
  componentWillMount() {
    this.handleInitState()
  }
  handleInitState() {
    let currentPath = this.props.location.pathname
    currentPath = currentPath.replace('/home', '')
    if (currentPath === '') {
      this.setState({
        currentMenu: ['dashboard'],
        openKeys: []
      })
      return
    }
    const path = currentPath.slice(1)
    this.generateCurrentMenuAndOpenKeysBasePath(path)
  }
  generateCurrentMenuAndOpenKeysBasePath(path) {
    const openKeyArr = path.split('/')
    let menuData = [...this.props.menuData]
    let parentPath = ''
    let resultMenuData
    const openKeys = []
    for (const key of openKeyArr) {
      const result = menuData.find(menu => {
        return menu.path === parentPath + key
      })
      if (result === undefined) {
        resultMenuData = undefined
        break
      } else {
        menuData = _.isArray(result.children) ? [...result.children] : []
        parentPath = result.path + '/'
        openKeys.push(result.path)
        resultMenuData = result
      }
    }
    if (resultMenuData === undefined) {
      // 此时应该渲染404
      this.setState({
        currentMenu: [],
        openKeys: []
      })
    } else {
      openKeys.pop()
      this.setState({
        currentMenu: [resultMenuData.path],
        openKeys
      })
    }
  }
  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.props.menuData.findIndex(item => {
      return item.path === latestOpenKey
    }) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  getMenu(menuData) {
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
              {this.getMenu(item.children, `${item.path}/`)}
            </SubMenu>
          )
      }
      return item.hideInMenu ? null :
        (
          <Menu.Item key={item.key || item.path}>
            <Link
              to={`/home/${item.path}`}
              replace={`/home/${item.path}` === this.props.location.pathname}
            >
              {icon}
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        )
    })
  }
  menuClick({ key }) {
    this.setState({
      currentMenu: [key]
    })
    this.props.addTab(key)
  }
  adjustSelectedMenu(path) {
    this.generateCurrentMenuAndOpenKeysBasePath(path)
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
        {_.isEmpty(this.props.menuData) ?
          <Spin size="large" style={{ marginTop: '30vh', width: '100%' }} />
          : (<Menu
            selectedKeys={selectedKeys}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.props.collapsed}
            onOpenChange={this.onOpenChange.bind(this)}
            onClick={this.menuClick.bind(this)}
            {...menuProps}
            className={styles.menu}
          >
            {this.getMenu(this.props.menuData)}
          </Menu>)
        }
      </Sider>
    );
  }
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  menuData: PropTypes.array.isRequired,
  addTab: PropTypes.func.isRequired
}

export default Sidebar;
