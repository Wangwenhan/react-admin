import React, { Component } from 'react';
import { connect } from 'react-redux'
import styles from './index.scss'
import PropTypes from 'prop-types'
import queryString from 'qs'
import { changeActiveKey as changeActiveKeyFromAction } from 'actions/user'
import { Tabs, Button, Layout, Dropdown, Menu, Icon } from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
import IconSvg from 'components/IconSvg'
import NotFound from 'containers/404'
import Dashboard from 'containers/Tab/Dashboard'

class AppMain extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      activeKey: 'dashboard',
      panes: [{
        title: <span className={styles.treeNodeUnselectable} onDoubleClick={this.doubleClick.bind(this, 'dashboard')}><IconSvg iconClass='homepage' className={styles.tab_icon} />监控首页</span>,
        content: <Dashboard addHideTab={this.addHideTab} getActiveKey={this.getActiveKey} tabKey='dashboard' />,
        key: 'dashboard',
        closable: false
      }]
    }
  }
  componentDidMount() {
    // 初始化的时候 渲染url里的路径指向的tab
    this.handRouterChangeFromPath(true)
    this.unlisten = this.props.history.listen((location) => {
      this.handRouterChangeFromPath(false, location)
    })
  }
  componentWillUnmount() {
    // 解绑
    this.unlisten()
  }
  // componentWillReceiveProps() {
  //   setTimeout(() => {
  //     this.handRouterChangeFromPath()
  //   }, 0)
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('2', nextState.activeKey, this.state.activeKey)
  //   if (nextState.activeKey !== this.state.activeKey) {
  //     return true
  //   }
  //   return false
  // }

  handRouterChangeFromPath(isInit, location = this.props.location) {
    // 监听路由变化 渲染Tab以及切换当前选中tab
    let path = location.pathname
    path = path.replace('/home', '')
    if (path === '') {
      // 如果打开了首页 /  跳转到dashboard页
      this.props.history.replace(`/home/dashboard`)
      // this.props.adjustSelectedMenu(`/home/dashboard`)
      return
    }
    const params = queryString.parse(location.search.slice(1))
    if (params.from === 'subpages') {
      // 如果路由变更后的路径是subpage页面 其实这会已经完成了tab页切换 不需要再次addTab
      if (isInit) {
        // 如果是初始化进来的时候 url是subpge 则跳转到它的父页面
        this.props.history.replace(`/home${path}`)
      } else {
        return
      }
    }
    path = path.slice(1)
    if (isInit) {
      // setTimeout(() => {
      this.addTab(path)
      // }, 0)
    } else {
      this.addTab(path)
      this.props.adjustSelectedMenu(path)
    }
  }
  onEdit(targetKey, action) {
    this[action](targetKey)
  }
  add() {
    console.error('不应该走这个方法：add（）')
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
    this.props.changeActiveKey(activeKey)
  }
  remove(targetKey) {
    // 与地址栏和sidebar联动
    let activeKey = this.state.activeKey;
    let lastIndex;
    let path = this.props.location.pathname
    const params = queryString.parse(this.props.location.search.slice(1))
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      // 删除的是当前active的tab
      activeKey = panes[lastIndex].key;
      const index = activeKey.indexOf('/subpages/')
      if (index > -1) {
        if (path !== `/home/${activeKey.slice(0, index)}`) {
          // 如果原页面和旧页面没有关系（非主与subpage的关系）
          this.props.history.push(`/home/${activeKey.slice(0, index)}?from=subpages`)
        } else {
          // 如果切换了subpage的页面 因为subpage的页面和他的来源页保持同一个url 所以会导致打开了来源页的tab
          if (targetKey.indexOf('/subpages/') === -1) {
            // 如果原页面不是subpage页面
            this.props.history.push(`/home/${activeKey.slice(0, index)}?from=subpages`)
          } else {
            // 如果原页面是subpage页面
            if (params.from !== 'subpages') {
              // 有可能存在一个页面呼出多个subpage页面的情况  由于url是一样的 所以不要push route
              this.props.history.push(`/home/${activeKey.slice(0, index)}?from=subpages`)
            }
          }
        }
        this.props.adjustSelectedMenu(activeKey.slice(0, index))
      } else {
        if (path === `/home/${activeKey}` && params.from !== 'subpages') {
          // 如果从subpage切回到它的来源页  由于url是一样的 所以不要push route
          this.setState({ panes, activeKey })
          this.props.changeActiveKey(activeKey)
          return
        }
        this.props.history.push(`/home/${activeKey}`)
        this.props.adjustSelectedMenu(activeKey)
      }
    }
    this.setState({ panes, activeKey })
    this.props.changeActiveKey(activeKey)
  }
  onChange(activeKey) {
    const orginActiveKey = activeKey
    let path = this.props.location.pathname
    const params = queryString.parse(this.props.location.search.slice(1))
    // 与地址栏和sidebar联动
    const index = activeKey.indexOf('/subpages/')
    if (index > -1) {
      // 如果新的tab页是subpage页面
      activeKey = activeKey.slice(0, index)
      if (path !== `/home/${activeKey}`) {
        // 如果原页面和旧页面没有关系（非主与subpage的关系）
        this.props.history.push(`/home/${activeKey}?from=subpages`)
      } else {
        // 如果切换了subpage的页面 因为subpage的页面和他的来源页保持同一个url 所以会导致打开了来源页的tab
        if (this.state.activeKey.indexOf('/subpages/') === -1) {
          // 如果原页面不是subpage页面
          this.props.history.push(`/home/${activeKey}?from=subpages`)
        } else {
          // 如果原页面是subpage页面
          if (params.from !== 'subpages') {
            // 有可能存在一个页面呼出多个subpage页面的情况  由于url是一样的 所以不要push route
            this.props.history.push(`/home/${activeKey}?from=subpages`)
          }
        }
      }
    } else {
      // 如果新的tab页不是subpage页面
      if (path === `/home/${activeKey}` && params.from !== 'subpages') {
        // 如果从subpage切回到它的来源页  由于url是一样的 所以不要push route
        this.setState({
          activeKey: orginActiveKey
        })
        this.props.changeActiveKey(orginActiveKey)
        return
      }
      this.props.history.push(`/home/${activeKey}`)
    }
    this.props.adjustSelectedMenu(activeKey)
    this.setState({
      activeKey: orginActiveKey
    })
    this.props.changeActiveKey(orginActiveKey)
  }
  addHideTab = (path, page, title, propData, isMultiPage, key, shouldUpdateTab) => {
    if (key) {
      if (this.state.panes.findIndex(item => {
        return item.key === path + '_' + key
      }) > -1 && !isMultiPage) {
        // 如果存在这个tab
        if (this.state.activeKey === path + '_' + key) {
          return
        }

        // 根据业务需要增加此处逻辑--》支持刷新原来已打开的Tab，当然propData变更也会生效
        if (shouldUpdateTab) {
          const panes_1 = [...this.state.panes]
          const index_1 = panes_1.findIndex(item_1 => {
            return item_1.key === path + '_' + key
          })
          const curentPane = panes_1.splice(index_1, 1)
          let Content = require(`./../../../Tab/${page}`).default // eslint-disable-line
          Content = <Content addHideTab={this.addHideTab} propData={propData} getActiveKey={this.getActiveKey} tabKey={path + '_' + key} />
          curentPane[0].content = Content
          this.setState({
            panes: panes_1
          }, () => {
            const nextPanes = [...this.state.panes]
            nextPanes.splice(index_1, 0, curentPane[0])
            this.setState({
              panes: nextPanes
            })
          })
        }
        // 2018-06-27

        this.setState({
          activeKey: path + '_' + key
        })
        this.props.changeActiveKey(path + '_' + key)
        return
      }
    } else {
      if (this.state.panes.findIndex(item => {
        return item.key === path
      }) > -1 && !isMultiPage) {
        // 如果存在这个tab
        if (this.state.activeKey === path) {
          return
        }

        // 根据业务需要增加此处逻辑--》支持刷新原来已打开的Tab，当然propData变更也会生效
        if (shouldUpdateTab) {
          const panes_1 = [...this.state.panes]
          const index_1 = panes_1.findIndex(item_1 => {
            return item_1.key === path
          })
          const curentPane = panes_1.splice(index_1, 1)
          let Content = require(`./../../../Tab/${page}`).default // eslint-disable-line
          Content = <Content addHideTab={this.addHideTab} propData={propData} getActiveKey={this.getActiveKey} tabKey={path} />
          curentPane[0].content = Content
          this.setState({
            panes: panes_1
          }, () => {
            const nextPanes = [...this.state.panes]
            nextPanes.splice(index_1, 0, curentPane[0])
            this.setState({
              panes: nextPanes
            })
          })
        }
        // 2018-06-27

        this.setState({
          activeKey: path
        })
        this.props.changeActiveKey(path)
        return
      }
    }
    // 如果不存在这个tab或者是多开的tab
    const tabKey = isMultiPage ? path + '_' + new Date().getTime() : path
    let Content
    try {
      Content = require(`./../../../Tab/${page}`).default // eslint-disable-line
      Content = <Content addHideTab={this.addHideTab} propData={propData} getActiveKey={this.getActiveKey} tabKey={key ? path + '_' + key : tabKey} />
    } catch (error) {
      if (error.toString().startsWith('Error: Cannot find module')) {
        Content = NotFound
        Content = <Content style={{ height: 'calc( 100vh - 60px )' }} shouldHideReturnHomeBtn={true} />
      } else {
        console.log(error)
      }
    }
    this.setState({
      activeKey: key ? path + '_' + key : tabKey,
      panes: this.state.panes.concat([{
        title: <span className={styles.treeNodeUnselectable} onDoubleClick={this.doubleClick.bind(this, key ? path + '_' + key : tabKey)}>{title}</span>,
        content: Content,
        key: key ? path + '_' + key : tabKey,
        closable: true
      }])
    })
    this.props.changeActiveKey(key ? path + '_' + key : tabKey)
    this.props.history.push(`/home/${tabKey.slice(0, tabKey.indexOf('/subpages/'))}?from=subpages`)
  }
  doubleClick(path, e) {
    const panes = [...this.state.panes]
    const index = panes.findIndex(item => {
      return item.key === path
    })
    const curentPane = panes.splice(index, 1)
    this.setState({
      panes
    }, () => {
      const nextPanes = [...this.state.panes]
      nextPanes.splice(index, 0, curentPane[0])
      this.setState({
        panes: nextPanes
      })
    })
  }
  addTab(path) {
    if (this.state.panes.findIndex(item => {
      return item.key === path
    }) > -1) {
      if (this.state.activeKey === path) {
        // 非常重要 删除会造成死循环
        return
      }
      this.setState({
        activeKey: path
      })
      this.props.changeActiveKey(path)
      return
    }
    let Content
    try {
      // console.log(path, this.props.menuData[path].page)
      Content = require(`./../../../Tab/${this.props.menuData[path].page.slice(2)}`).default // eslint-disable-line
      Content = <Content addHideTab={this.addHideTab} getActiveKey={this.getActiveKey} tabKey={path} />
    } catch (error) {
      if (error.toString().startsWith('Error: Cannot find module')) {
        Content = NotFound
        Content = <Content style={{ height: 'calc( 100vh - 60px )' }} shouldHideReturnHomeBtn={true} />
      } else {
        console.log(error)
      }
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
    this.props.changeActiveKey(path)
  }
  getActiveKey = () => {
    return this.state.activeKey
  }
  getTitle(path) {
    const menu = this.props.menuData[path]
    if (menu) {
      return (<span className={styles.treeNodeUnselectable} onDoubleClick={this.doubleClick.bind(this, path)}>{menu.icon ? (<IconSvg iconClass={menu.icon} className={styles.tab_icon} />) : null}{menu.name}</span>)
    } else {
      // 用户手动输入的不存在的页面
      return (<span>{path}</span>)
    }

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
      // this.props.changeActiveKey('dashboard')
      // this.props.adjustSelectedMenu('dashboard')
      this.props.history.replace(`/home/dashboard`)
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
        <Icon
          className={styles.trigger}
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
      </Content>
    );
  }
}

const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeActiveKey: (activeKey) => {
      dispatch(changeActiveKeyFromAction(activeKey))
    }
  }
}

AppMain.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  adjustSelectedMenu: PropTypes.func.isRequired,
  menuData: PropTypes.object.isRequired,
  changeActiveKey: PropTypes.func.isRequired
}

const connectAppMain = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMain)

export default connectAppMain
