import './polyfills'
import 'normalize.css'
import './styles/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import AppComponent from './containers/App'
import './icon' // svg-sprite 手动载入所有图标文件
// import registerServiceWorker from './registerServiceWorker';
import './mock' // 拦截请求 接口模拟

// registerServiceWorker();

ReactDOM.render(
  <AppComponent />,
  document.getElementById('root'),
)
