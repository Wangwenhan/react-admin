import 'babel-polyfill'
import 'normalize.css'
import './styles/index.scss'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import {store} from './store'
import Home from './containers/Home'
import Login from './containers/Login'
import NoMatch from './containers/404'
// import registerServiceWorker from './registerServiceWorker';

const supportsHistory = 'pushState' in window.history
render(
  <Provider store={store}>
    <LocaleProvider locale={zh_CN}>
      <Router forceRefresh={!supportsHistory}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/modify" render={() => <h1>Modify</h1>} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);
  // registerServiceWorker();
