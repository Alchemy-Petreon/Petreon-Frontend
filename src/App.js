import React, { Component } from 'react'
import './style/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import LandingPage from './LandingPage.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Browse from './Browse.js';
import AboutUs from './AboutUs.js';
import UserDash from './UserDash.js';
import PetDetails from './PetDetails.js'
import PostDetails from './PostDetails.js'

export default class App extends Component {
  state = {
    loginInfo: {},
    userInfo: {}
  }

  handleAppState = async (object) => {
    console.log(object)
    await this.setState(object)
    console.log(this.state.userInfo)
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route
              path="/"
              exact render={(routerProps) => <LandingPage {...routerProps} />}
            />

            <Route
              path="/login/:email/:firstName/:exisiting"
              exact render={(routerProps) => <Login {...routerProps}
                handleAppState={this.handleAppState}
              />}
            />
            
            <Route
              path="/signup"
              exact render={(routerProps) => <SignUp {...routerProps}
                loginInfo={this.state.loginInfo}
              />}
            />

            <Route
              path="/browse"
              exact render={(routerProps) => <Browse {...routerProps} />}
            />

            <Route
              path="/pets/:id"
              exact render={(routerProps) => <PetDetails {...routerProps}
                user={this.state.userInfo} />}



            />

            <Route
              path="/posts/:id"
              exact render={(routerProps) => <PostDetails {...routerProps}
                user={this.state.userInfo} />}
            />

            <Route
              path="/aboutus"
              exact render={(routerProps) => <AboutUs {...routerProps} />}
            />

            <Route
              path="/userdash"
              exact render={(routerProps) => <UserDash {...routerProps}
                user={this.state.userInfo} />}


            />
          </Switch>
          <Footer />
        </Router>
      </div>
    )
  }
}