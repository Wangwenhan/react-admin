import React, { Component } from 'react';
import styles from './index.scss'
import PropTypes from 'prop-types'
import { Tabs, Button, Layout, Dropdown, Menu, Icon } from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
import DashBoard from '../../../DashBoard'

class AppMain extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      activeKey: 'tab/dashboard',
      panes: [
        {
          title: <span>DashBoard</span>,
          content: <DashBoard />,
          key: 'dashboard',
          closable: false
        }
      ]
    }
  }
  componentWillMount() {
    let path = this.props.location.pathname
    path = path.replace('/home/', '')
    this.addTab(path)
  }
  onChange(activeKey) {
    this.setState({ activeKey });
    this.props.adjustSelectedMenu(activeKey)
  }
  onEdit(targetKey, action) {
    this[action](targetKey);
  }
  addTab(path) {
    this.setState({
      activeKey: path,
      panes: this.state.panes.concat([{
        title: <span>{path}</span>,
        content: <DashBoard />,
        key: path,
        closable: true
      }])
    })
  }
  add() {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  }
  remove(targetKey) {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
      this.props.adjustSelectedMenu(panes[lastIndex].key)
    }
    this.setState({ panes, activeKey });
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item key='Tabs-CloseOthers'>关闭其他</Menu.Item>
        <Menu.Item key='Tabs-CloseAll'>关闭所有</Menu.Item>
      </Menu>
    )
    const operations = (
      <Dropdown
        type='ghost'
        overlay={menu}
        trigger={['click']}
      >
        <Button>
          更多操作 <Icon type='down' />
        </Button>
      </Dropdown>
    )
    return (
      <Content className={styles.app_main_wrapper}>
        <Tabs
          type="editable-card"
          hideAdd
          onChange={this.onChange.bind(this)}
          activeKey={this.state.activeKey}
          onEdit={this.onEdit.bind(this)}
          tabBarExtraContent={operations}
        >
          {this.state.panes.map(pane =>
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              {pane.content}
            </TabPane>)
          }
        </Tabs>
      </Content>
    );
  }
}

AppMain.propTypes = {
  location: PropTypes.object.isRequired,
  adjustSelectedMenu: PropTypes.func.isRequired
}

export default AppMain;
