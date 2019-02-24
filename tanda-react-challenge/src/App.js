import React, { Component } from 'react';
import { Redirect } from 'react-router';

//import logo from './logo.svg';
import './App.css';
import { withCookies } from 'react-cookie';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { LoginPage } from './components/LoginPage.js';
import { RegistrationPage } from './components/RegistrationPage.js';
import { OrgsPage } from './components/OrgsPage.js';
import { EditOrg } from './components/EditOrg.js';
import { ViewShifts } from './components/ViewShifts.js'
import { NoOrgs } from './components/NoOrgs.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: "/",
            userData: ""
        }
        this.changePage = this.changePage.bind(this);
    }



    changePage(...params) {
        console.log("Changepage called to "+params[0]);
        switch (params[0]) {
            case "/":
            case "/register":
                this.setState({
                    currentPage: params[0]
                });
            case "/orgs":
                this.setState({
                    currentPage: params[0],
                    userData: params[1]
                });
            case "/editOrg":
                this.setState({
                    currentPage: params[0],
                    editOrgData: params[1]
                });
            case "/noOrgs":
                this.setState({
                    currentPage: params[0],
                });
            case "/viewShifts":
                this.setState({
                    currentPage: params[0],
                    usersOrgName: params[1]
                });
        }

    }


  render() {
    const { cookies } = this.props; // The cookie store
    return (
        <div>
            Session-id: {cookies.get('session-id')}
            <div id="component-container">
                {{
                    "/":            <LoginPage cookies={this.props.cookies} changePage={this.changePage}/>,
                    "/register":    <RegistrationPage cookies={this.props.cookies}/>,
                    "/orgs":        <OrgsPage cookies={this.props.cookies} userData={this.state.userData} changePage={this.changePage} />,
                    "/editOrg":     <EditOrg cookies={this.props.cookies} userData={this.state.userData} editOrgData = {this.state.editOrgData} changePage={this.changePage}/>,
                    "/noOrgs":      <NoOrgs cookies={this.props.cookies} userData={this.state.userData} editOrgData = {this.state.editOrgData} changePage={this.changePage}/>,
                    "/viewShifts":  <ViewShifts cookies={this.props.cookies} userData={this.state.userData} usersOrgName={this.state.usersOrgName} changePage={this.changePage}/>
                }[this.state.currentPage]}


                {/*<Switch>*/}
                  {/*<Route*/}
                    {/*exact path="/"*/}
                    {/*render={() => ()}*/}
                  {/*/>*/}
                  {/*<Route*/}
                      {/*path="/register"*/}
                      {/*render={() => (<RegistrationPage cookies={this.props.cookies}/>)}*/}
                  {/*/>*/}
                  {/*<Route*/}
                    {/*path="/orgs"*/}
                    {/*render={(props) => (<OrgsPage cookies={this.props.cookies} orgsData={props} />)}*/}
                  {/*/>*/}
                  {/*<Route  // Test*/}
                    {/*path="/editorg/:orgId"*/}
                    {/*render={(props) => (<EditOrg cookies={this.props.cookies} urlParams={props}/>)}*/}
                  {/*/>*/}
                {/*<Route*/}
                    {/*path="/viewshifts"*/}
                    {/*render={() => (<ViewShifts cookies={this.props.cookies}/>)}*/}
                {/*/>*/}
                {/*</Switch>*/}
            </div>
        </div>
    );
  }
}

export default withCookies(App);
