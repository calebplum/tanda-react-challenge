import React, { Component } from 'react';

//import logo from './logo.svg';
import './App.css';
import { withCookies } from 'react-cookie';
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
        };
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
      var loginGreeting = (this.state.currentPage !== '/' && this.state.currentPage !== '/register') ?  <span>Logged in as {this.state.userData.orgData.name} <button onClick={this.logoutUser}>Logout</button> </span> : '';

    return (
        <div>
            Session-id: {cookies.get('session-id')}
            <div id="component-container">

                {loginGreeting}
                {{
                    "/":            <LoginPage cookies={this.props.cookies} changePage={this.changePage}/>,
                    "/register":    <RegistrationPage cookies={this.props.cookies} changePage={this.changePage}/>,
                    "/orgs":        <OrgsPage cookies={this.props.cookies} userData={this.state.userData} changePage={this.changePage}/>,
                    "/editOrg":     <EditOrg cookies={this.props.cookies} userData={this.state.userData} editOrgData = {this.state.editOrgData} changePage={this.changePage}/>,
                    "/viewShifts":  <ViewShifts cookies={this.props.cookies} userData={this.state.userData} usersOrgName={this.state.usersOrgName} usersOrgHourlyRate={this.state.usersOrgHourlyRate}/>
                }[this.state.currentPage]}
            </div>
        </div>
    );
  }
}

export default withCookies(App);
