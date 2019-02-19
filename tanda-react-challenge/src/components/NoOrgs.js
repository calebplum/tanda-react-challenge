// This component will be mounted on the OrgsPage if the user is not currently a part of any organisations

import React, { Component } from 'react';

export class NoOrgs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organisations: {}
        };
    }

    componentWillMount() {
        const {cookies} = this.props; // The cookie store
        if (cookies.get('session-id')) {
            fetch('/organisations', {
                method: 'get',
                headers: {
                    'Authorization': cookies.get('session-id'),
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    this.setState({
                        organisations: data
                    });
                }).catch((err) => {
                    console.log(err);
            });
        }
    }

    render() {
        const organisationList = Array.from(this.state.organisations).map(function(id) {
            return <li>{id.name} | {id.hourlyRate}</li>
        });

        return (
            <div id="page-wrap">
                You aren't a member of any organisations. Join an existing one or create a new one.
                <h1>Organisations</h1>
                <div id="orgs-list">
                    <ul>
                        {organisationList}
                    </ul>
                </div>

                <h1>Create Organisation</h1>
                <div>
                    <label>Name:</label>
                    <input type="text" />
                    <br />
                    <label>Hourly rate: $</label>
                    <input type="text" />
                    <button>Create and Join</button>
                </div>
            </div>
        )
    }

}