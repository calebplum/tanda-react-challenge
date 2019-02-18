import React, { Component } from 'react';
import { NoOrgs } from './NoOrgs.js';

export class OrgsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    // Function to check for a session-id in the browser cookies.
    // If a session-id is found, the function will attempt to fetch the logged-in user's first name
    // If no session-id is found, the function will alert the user (in future it will redirect to the login page)
    componentWillMount() {
        const {cookies} = this.props; // The cookie store
        if (cookies.get('session-id')) {
            fetch('/users/me', {
                method: 'get',
                headers: {
                    'Authorization': cookies.get('session-id'),
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    this.setState({name: data.name});
                }).catch((err) => {
                    console.log(err);
            });
        } else {
            console.log("No session-id found (user not logged in");
            window.alert('Please login');
            //TODO - redirect to login page
        }
    }

    render() {
        return (
            <div id="page-wrap">
                Logged in as {this.state.name} <span id="logout">Logout</span>
                <NoOrgs />

            </div>
        )
    }

}