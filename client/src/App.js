import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Prs from './components/prs/Prs';
import MyPrs from './components/prs/MyPrs';
import Pr from './components/pr/PR';
import PRForm from './components/prs/PRForm';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)); // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser()); // Redirect to login
    window.location.href = './login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/pr/allprs' component={Prs} />
              <PrivateRoute exact path='/pr/myprs' component={MyPrs} />
              <PrivateRoute exact path='/pr/viewpr/:id' component={Pr} />
              <PrivateRoute exact path='/pr/add' component={PRForm} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
