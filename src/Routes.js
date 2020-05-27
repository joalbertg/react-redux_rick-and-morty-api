import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//import Home from './components/home/HomePage';
import GraphHome from './components/home/GraphHome';
import FavPage from './components/favs/FavPage';
import LoginPage from './components/login/LoginPage';

const PrivateRoute = ({ path, component, loggedIn, ...rest}) => {
  if (loggedIn) {
    return <Route path={path} component={component} {...rest} />
  } else {
    return <Redirect to='/login' {...rest} />
  }
}

const Routes = ({loggedIn}) => (
  <Switch>
  { /* <PrivateRoute exact path="/" loggedIn={loggedIn} component={Home} /> */ }
    <PrivateRoute exact path="/" loggedIn={loggedIn} component={GraphHome} />
    <PrivateRoute path="/favs" loggedIn={loggedIn} component={FavPage} />
    <Route path="/login" component={LoginPage} />
  </Switch>
);

const mapStateToProps = ({user: {loggedIn}}) => ({
  loggedIn
});

export default connect(mapStateToProps)(Routes);

