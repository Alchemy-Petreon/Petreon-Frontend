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
    loggedIn: localStorage.getItem('loggedIn') || false,
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

              <PrivateRoute
                path="/browse"
                token={this.state.loggedIn}
                exact render={(routerProps) => <Browse {...routerProps}
                />}
              />

              <PrivateRoute
                path="/pets/:id"
                token={this.state.loggedIn}
                exact render={(routerProps) => <PetDetails {...routerProps}
                />}
              />

              <PrivateRoute
                path="/posts/:id"
                token={this.state.loggedIn}
                exact render={(routerProps) => <PostDetails {...routerProps}
                />}
              />

              <PrivateRoute
                path="/createpet"
                token={this.state.loggedIn}
                exact render={(routerProps) => <CreatePet {...routerProps}
                />}
              />
              <PrivateRoute
                path="/petdash/:id"
                token={this.state.loggedIn}
                exact render={(routerProps) => <PetDash {...routerProps}
                />}
              />

              <PrivateRoute
                path="/aboutus"
                token={this.state.loggedIn}
                exact render={(routerProps) => <AboutUs {...routerProps} />}
              />

              <PrivateRoute
                path="/userdash"
                token={this.state.loggedIn}
                exact render={(routerProps) => <UserDash {...routerProps}
                />}
              />

              <PrivateRoute
                path="/createpost/:id"
                token={this.state.loggedIn}
                exact render={(routerProps) => <CreatePost {...routerProps}
                />}
              />
              <PrivateRoute
                path="/update-post/:id"
                token={this.state.loggedIn}
                exact render={(routerProps) => <UpdatePost {...routerProps}
                />}
              />
              <PrivateRoute
                path="/update-pet/:id"
                token={this.state.loggedIn}
                exact render={(routerProps) => <UpdatePet {...routerProps}
                />}
              />
              <PrivateRoute
                path="/user/:id"
                token={this.state.loggedIn}
                exact render={(routerProps) => <UserProfile {...routerProps}
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