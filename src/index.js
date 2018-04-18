import 'babel-polyfill'
import 'normalize.css'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './styles/index.scss'
import todoApp from './reducers'
import Root from './containers/Root'
import Login from './containers/Login'
import NoMatch from './containers/404'
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(todoApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Root} />
        <Route path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
  // registerServiceWorker();
