import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Root from '../containers/root'

export default class RouterTest extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Root}/>
          <Route path="/main" render={() => (<div>main</div>)} />
          <Route path="/home" render={() => (<div>home</div>)} />
          <Route render={() => (<div>404</div>)} />
        </Switch>
      </Router>
    )
  }
}
