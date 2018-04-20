import React, { Component } from 'react';
import './index.scss'
import { Layout } from 'antd';
const { Content } = Layout;

class AppMain extends Component {
  render() {
    return (
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
        Content
          </Content>
    );
  }
}

export default AppMain;
