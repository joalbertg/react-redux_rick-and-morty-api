import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/home/HomePage';
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
    <PrivateRoute exact path="/" loggedIn={loggedIn} component={Home} />
    <PrivateRoute path="/favs" loggedIn={loggedIn} component={FavPage} />
    <Route path="/login" component={LoginPage} />
  </Switch>
);

const mapStateToProps = ({user: {loggedIn}}) => ({
  loggedIn
});

export default connect(mapStateToProps)(Routes);

