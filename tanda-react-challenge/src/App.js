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
            userData: "",
        }
        this.changePage = this.changePage.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser() {

        const { cookies } = this.props;

            fetch('/auth/logout', {
                method: 'delete',
                headers: {
                    'Authorization': cookies.get('session-id'),
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                cookies.remove('session-id');
                // this.setState({userData: ''});
                this.changePage('/');
            })

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
                    orgsList: params[1],
                });
            case "/viewShifts":
                this.setState({
                    currentPage: params[0],
                    usersOrgName: params[1],
                    usersOrgHourlyRate: params[2]
                });
        }

    }


  render() {
    const { cookies } = this.props; // The cookie store
      var loginGreeting = (this.state.currentPage !== '/') ?  <span>Logged in as {this.state.userData.orgData.name} <button onClick={this.logoutUser}>Logout</button> </span> : '';
      // var loginGreeting = (typeof(this.state.userData.orgData.name) !== undefined) ?  <span>Logged in as {this.state.userData.orgData.name} <button onClick={this.logoutUser}>Logout</button> </span> : '';
      // var loginGreeting =  <span>Logged in as [username] <button onClick={this.logoutUser}>Logout</button> </span>;

    return (
        <div>
            {/*{console.log('userdata: ',this.state.userData)}*/}
            {/*{this.updateUserDataOrg(1)}*/}
            Session-id: {cookies.get('session-id')}
            <div id="component-container">

                {loginGreeting}
                {/*Logged in as {this.props.userData.orgData.name} <span id="logout">Logout</span>*/}

                {/*{console.log(this.state.userData.userData)};*/}
                {/*Logged in as {this.state.userData.name} <span id="logout">Logout</span>*/}
                {{
                    "/":            <LoginPage cookies={this.props.cookies} changePage={this.changePage}/>,
                    "/register":    <RegistrationPage cookies={this.props.cookies} changePage={this.changePage}/>,
                    "/orgs":        <OrgsPage cookies={this.props.cookies} userData={this.state.userData} changePage={this.changePage}/>,
                    "/editOrg":     <EditOrg cookies={this.props.cookies} userData={this.state.userData} editOrgData = {this.state.editOrgData} changePage={this.changePage}/>,
                    "/noOrgs":      <NoOrgs cookies={this.props.cookies} userData={this.state.userData} editOrgData = {this.state.editOrgData} changePage={this.changePage} orgsList={this.state.orgsList}/>,
                    "/viewShifts":  <ViewShifts cookies={this.props.cookies} userData={this.state.userData} usersOrgName={this.state.usersOrgName} usersOrgHourlyRate={this.state.usersOrgHourlyRate} changePage={this.changePage}/>
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
