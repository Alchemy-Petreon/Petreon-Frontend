import React, { Component } from 'react'
import './style/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import LandingPage from './LandingPage.js';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
            path = "/"
            exact render={(routerProps) => <LandingPage {...routerProps} />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}