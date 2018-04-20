import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './index.scss'
import { Layout, Icon } from 'antd';
const { Header } = Layout;
class Navbar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className={styles.trigger}
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
      </Header>
    );
  }
}

Navbar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}

export default Navbar;
