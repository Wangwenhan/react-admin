import React, { Component } from 'react';
import styles from './index.scss'
import PropTypes from 'prop-types'
import { Tabs, Button, Layout, Dropdown, Menu, Icon } from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
import IconSvg from 'components/IconSvg'
import NotFound from 'containers/404'

class AppMain extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      activeKey: 'tab/dashboard',
      panes: []
    }
  }
  componentWillMount() {
    this.addTab('dashboard')
    this.handRouterChangeFromPath(true)
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      this.handRouterChangeFromPath()
    }, 0)
  }
  handRouterChangeFromPath(isInit) {
    let path = this.props.location.pathname
    path = path.replace('/home', '')
    if (path === '') {
      this.props.history.replace(`/home/dashboard`)
      return
    }
    path = path.slice(1)
    if (isInit) {
      setTimeout(() => {
        this.addTab(path)
      }, 0)
    } else {
      this.addTab(path)
    }
  }
  onChange(activeKey) {
    this.setState({ activeKey })
    this.props.adjustSelectedMenu(activeKey)
    this.props.history.push(`/home/${activeKey}`)
  }
  onEdit(targetKey, action) {
    this[action](targetKey)
  }
  addTab(path) {
    if (this.state.panes.findIndex(item => {
      return item.key === path
    }) > -1) {
      if (this.state.activeKey === path) {
        return
      }
      this.setState({
        activeKey: path
      })
      return
    }
    let Content
    try {
      Content = require(`./../../../Tab/${path}`).default // eslint-disable-line
      Content = <Content />
    } catch (error) {
      Content = NotFound
      Content = <Content style={{ height: 'calc( 100vh - 140px )' }} shouldHideReturnHomeBtn={true} />
    }
    this.setState({
      activeKey: path,
      panes: this.state.panes.concat([{
        title: this.getTitle(path),
        content: Content,
        key: path,
        closable: path === 'dashboard' ? false : true
      }])
    })
  }
  getTitle(path) {
    const menu = this.props.menuData[path]
    if (menu) {
      return (<span><IconSvg iconClass={this.props.menuData[path].icon} className={styles.tab_icon} />{this.props.menuData[path].name}</span>)
    } else {
      return (<span>{path}</span>)
    }

  }
  add() {
    console.error('不应该走这个方法：add（）')
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
      this.props.history.push(`/home/${activeKey}`)
    }
    this.setState({ panes, activeKey });
  }
  handleMoreOptionClick({ key }) {
    if (key === 'Tabs-CloseOthers') {
      this.setState({
        panes: this.state.panes.filter(item => {
          return item.key === 'dashboard' || item.key === this.state.activeKey
        })
      })
    } else if (key === 'Tabs-CloseAll') {
      this.setState({
        panes: this.state.panes.filter(item => {
          return item.key === 'dashboard'
        }),
        activeKey: 'dashboard'
      })
    }
  }
  render() {
    const menu = (
      <Menu onClick={this.handleMoreOptionClick.bind(this)}>
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
  history: PropTypes.object.isRequired,
  adjustSelectedMenu: PropTypes.func.isRequired,
  menuData: PropTypes.object.isRequired
}

export default AppMain;
