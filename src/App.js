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
import { MainContext } from './MainContext';

export default class App extends Component {
  state = {
    profile: "test",
    loggedIn: false,
    setProfile: (profile) => this.setState(profile),
    logOut: () => this.setState({ loggedIn: false }),
    logIn: () => this.setState({ loggedIn: true })
  }

  render() {
    return (
      <MainContext.Provider value={this.state}>
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
                />}
              />

              <Route
                path="/signup"
                exact render={(routerProps) => <SignUp {...routerProps}
                />}
              />

              <Route
                path="/browse"
                exact render={(routerProps) => <Browse {...routerProps} />}
              />

              <Route
                path="/pets/:id"
                exact render={(routerProps) => <PetDetails {...routerProps}
                />}
              />

              <Route
                path="/posts/:id"
                exact render={(routerProps) => <PostDetails {...routerProps}
                />}
              />

              <Route
                path="/aboutus"
                exact render={(routerProps) => <AboutUs {...routerProps} />}
              />

              <Route
                path="/userdash"
                exact render={(routerProps) => <UserDash {...routerProps} 
                />}
              />
            </Switch>
            <Footer />
          </Router>
        </div>
      </MainContext.Provider>
    )
  }
}