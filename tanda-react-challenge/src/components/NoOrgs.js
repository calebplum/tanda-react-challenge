// This component will be mounted on the OrgsPage if the user is not currently a part of any organisations

import React, { Component } from 'react';

export class NoOrgs extends Component {

    render() {
        return (
            <div id="page-wrap">
                You aren't a member of any organisations. Join an existing one or create a new one.
                <h1>Organisations</h1>
                <div id="orgs-list">
                    [Orgs will appear here]
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