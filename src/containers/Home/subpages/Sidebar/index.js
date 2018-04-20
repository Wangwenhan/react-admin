import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './index.scss'
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends Component {
  constructor(props) {
    super(props)
    // submenu keys of first level
    this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    this.state = {
      openKeys: ['sub1'],
    };
  }
  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  render() {
    const menuProps = this.props.collapsed ? {} : {
      openKeys: this.state.openKeys,
      defaultOpenKeys: ['sub1']
    }
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className={styles.logo} />
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.props.collapsed}
          onOpenChange={this.onOpenChange.bind(this)}
          {...menuProps}
        >
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
          <Menu.Item key="13">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired
}

export default Sidebar;
