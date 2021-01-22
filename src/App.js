import React, { Component } from 'react'
import './style/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './Header.js';
import LandingPage from './LandingPage.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Browse from './Browse.js';
import AboutUs from './AboutUs.js';
import UserDash from './UserDashboard/UserDash.js';
import PetDetails from './PetDetails.js';
import PostDetails from './PostDetails.js';
import PetDash from './PetDashboard/PetDash.js';
import CreatePet from './UserDashboard/CreatePet.js';
import CreatePost from './PetDashboard/CreatePost.js';
import { MainContext } from './MainContext';
import UserProfile from './UserProfile';
import UpdatePost from './UpdatePost'
import UpdatePet from './UpdatePet'
import PrivateRoute from './PrivateRoute'

export default class App extends Component {
  state = {
    profile: JSON.parse(localStorage.getItem('profile')),
    loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || false,
    setProfile: (profile) => {
      this.setState(profile);
      localStorage.setItem('profile', JSON.stringify(profile));
    },
    logOut: () => {
      this.setState({ loggedIn: false });
      localStorage.setItem('loggedIn', false)
    },
    logIn: () => {
      this.setState({ loggedIn: true });
      localStorage.setItem('loggedIn', true)
    }
  }

  componentDidMount = async () => {
    await this.state.setProfile(JSON.parse(localStorage.getItem('profile')))
  }

  render() {
    return (
      <MainContext.Provider value={this.state}>
        <div className="App">
          <Router>
            <Header history={this.history} />
            <Switch>
              <Route
                exact path="/"
                render={(routerProps) => <LandingPage {...routerProps} />}
              />

              <Route
                exact path="/login/:email/:firstName/:exisiting"
                render={(routerProps) => <Login {...routerProps}
                />}
              />

              <Route
                exact path="/signup"
                render={(routerProps) => <SignUp {...routerProps}
                />}
              />

              <PrivateRoute
                exact path="/browse"
                token={this.state.loggedIn}
                render={(routerProps) => <Browse {...routerProps}
                />}
              />

              <PrivateRoute
                exact path="/pets/:id"
                token={this.state.loggedIn}
                render={(routerProps) => <PetDetails {...routerProps}
                />}
              />

              <PrivateRoute
                exact path="/posts/:id"
                token={this.state.loggedIn}
                render={(routerProps) => <PostDetails {...routerProps}
                />}
              />

              <PrivateRoute
                exact path="/createpet"
                token={this.state.loggedIn}
                render={(routerProps) => <CreatePet {...routerProps}
                />}
              />
              <PrivateRoute
                exact path="/petdash/:id"
                token={this.state.loggedIn}
                render={(routerProps) => <PetDash {...routerProps}
                />}
              />

              <PrivateRoute
                exact path="/aboutus"
                token={this.state.loggedIn}
                render={(routerProps) => <AboutUs {...routerProps} />}
              />

              <PrivateRoute
                exact path="/userdash"
                token={this.state.loggedIn}
                render={(routerProps) => <UserDash {...routerProps}
                />}
              />

              <PrivateRoute
                exact path="/createpost/:id"
                token={this.state.loggedIn}
                render={(routerProps) => <CreatePost {...routerProps}
                />}
              />
              <PrivateRoute
                exact path="/update-post/:id"
                token={this.state.loggedIn}
                render={(routerProps) => <UpdatePost {...routerProps}
                />}
              />
              <PrivateRoute
                exact path="/update-pet/:id"
                token={this.state.loggedIn}
                render={(routerProps) => <UpdatePet {...routerProps}
                />}
              />
              <PrivateRoute
                exact path="/user/:id"
                token={this.state.loggedIn}
                render={(routerProps) => <UserProfile {...routerProps}
                />}
              />
            </Switch>
          </Router>
        </div>
      </MainContext.Provider>
    )
  }
}