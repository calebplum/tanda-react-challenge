import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { withCookies } from 'react-cookie';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { LoginPage } from './components/LoginPage.js';
import { RegistrationPage } from './components/RegistrationPage.js';
import { OrgsPage } from './components/OrgsPage';
import { EditOrg } from './components/EditOrg';

class App extends Component {
  render() {
    const { cookies } = this.props; // The cookie store
    return (
        <div>
            Session-id: {cookies.get('session-id')}
            <div id="component-container">
                <Switch>
                  <Route
                    exact path="/"
                    render={() => (<LoginPage cookies={this.props.cookies}/>)}
                  />
                  <Route
                      path="/register"
                      render={() => (<RegistrationPage cookies={this.props.cookies}/>)}
                  />
                  <Route
                    path="/orgs"
                    render={() => (<OrgsPage cookies={this.props.cookies}/>)}
                  />
                  <Route  // Test
                    path="/editorg/:orgId"
                    render={(props) => (<EditOrg cookies={this.props.cookies} urlParams={props}/>)}
                  />
                </Switch>
            </div>
        </div>
    );
  }
}

export default withCookies(App);
