import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { withCookies } from 'react-cookie';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { LoginPage } from './components/LoginPage.js';
import { RegistrationPage } from './components/RegistrationPage.js';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route
            exact path="/"
            render={() => (<LoginPage cookies={this.props.cookies}/>)}
            />
          <Route
              path="/register"
              render={() => (<RegistrationPage cookies={this.props.cookies}/>)}
          />
        </Switch>
    );
  }
}

export default withCookies(App);
