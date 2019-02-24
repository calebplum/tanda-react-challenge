import React, { Component } from 'react';
import { NoOrgs } from './NoOrgs.js';
import { CheckLoggedIn } from './CheckLoggedIn.js'
import {EditOrg} from "./EditOrg";
import {CurrentOrg} from './CurrentOrg.js'

export class OrgsPage extends Component {

    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            name: '',
            memberOrganisation: null,
            pageName: "",
            userData: props.userData.userData,
            orgData: props.userData.orgData,
            // changePage: props.changePage
        };
        this.leaveOrg = this.leaveOrg.bind(this);
    }

    leaveOrg() {

        const { cookies } = this.props;
        fetch('/organisations/leave', {
            method: 'post',
            headers: {
                'Authorization': cookies.get('session-id'),
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res);
            this.setState({
                orgData: ""
            })
        })
    }

    // Function to check for a session-id in the browser cookies.
    // If a session-id is found, the function will attempt to fetch the logged-in user's first name
    // If no session-id is found, the function will alert the user (in future it will redirect to the login page)
    componentWillMount() {
        // const {cookies} = this.props; // The cookie store
        // if (cookies.get('session-id')) {
        //     fetch('/users/me', {
        //         method: 'get',
        //         headers: {
        //             'Authorization': cookies.get('session-id'),
        //             'Content-Type': 'application/json'
        //         }
        //     }).then((res) => res.json())
        //         .then((data) => {
        //             this.setState({
        //                 name: data.name,
        //                 memberOrganisation: data.organisationId
        //             });
        //         }).catch((err) => {
        //             console.log(err);
        //     });
        // } else {
        //     console.log("No session-id found (user not logged in");
        //     // window.alert('Please login');
        //     //TODO - redirect to login page
        // }
    }

    render() {
        return (
            <div id="page-wrap">
                [OrgsPage]
                <CheckLoggedIn cookies={this.props.cookies}/>
                Logged in as {this.state.userData.name} <span id="logout">Logout</span>

                {/*{console.log(this.state.orgData)}*/}
                {this.state.orgData.organisationId === null
                    ?   <NoOrgs cookies={this.props.cookies} userData={this.userData} changePage={this.props.changePage}/>
                        : <CurrentOrg cookies={this.props.cookies} leaveOrg={this.leaveOrg} orgData={this.state.orgData} />}
            </div>
        )
    }

}