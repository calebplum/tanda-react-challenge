// This component will be mounted on the OrgsPage if the user is not currently a part of any organisations

import React, { Component } from 'react';

export class NoOrgs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organisations: {},
            // userData: props.userData.userData,
            // orgData: props.userData.orgData
            changePage: props.changePage
        };
        this.renderEditOrgPage = this.renderEditOrgPage.bind(this);
        this.joinOrg = this.joinOrg.bind(this);
        this.mapOrgs = this.mapOrgs.bind(this);
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
                    // console.log(data);
                    this.setState({
                        organisations: data
                    });
                }).catch((err) => {
                    console.log(err);
            });
        }
    }

    renderEditOrgPage(orgId, orgName, orgRate) {
        // console.log(this.props);
        // var self = this;
        // console.log('success');
        // console.log('id '+orgId, 'name '+orgName, 'rate '+orgRate);
        const editOrgData = {
            orgId: orgId,
            orgName: orgName,
            orgRate: orgRate
        };
        // this.props.changePage('/orgs');
        // console.log(this.props);
        // console.log(this.orgData);
        this.props.changePage('/editOrg', editOrgData);
    }

    joinOrg(orgId) {
        // console.log('joinOrg() called');
        console.log(this.props.orgData);
        const {cookies} = this.props;
        // if(cookies.get('session-id')) {
            fetch('/organisations/join', {
                method: 'post',
                headers: {
                    'Authorization': cookies.get('session-id'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'organisationId': orgId
                })
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    console.log('hello');
                    console.log(this.props.userData);
                    this.props.changePage('/orgs', this.props.userData)
                    // this.props.orgData.id = 3;
                    // this.props.rerenderParentCallback();
                })
                .catch((error) => {
                    console.log(error);
                })
        // }
    }

    mapOrgs() {
        var self = this;
        // return self.state;
        // console.log(self.state.organisations);
        console.log('in a log', this.props.orgsList);
        const organisationsList = Array.from(self.state.organisations).map(function(id) {
            // return <li>{id.name} | {id.hourlyRate} <button onClick={self.renderEditOrgPage}>Edit</button></li>
            return <li>{id.name} | {id.hourlyRate} <button onClick={() => self.renderEditOrgPage(id.id, id.name, id.hourlyRate)}>Edit</button>
                <button onClick={() => self.joinOrg(id.id)}>Join</button></li>
        });
        return organisationsList;
    }


    render() {
        // console.log('organisations list');
        // console.log(this.state.organisations);
        // var self = this;
        // const organisationList = Array.from(this.state.organisations).map(function(id) {
        //     return <li>{id.name} | {id.hourlyRate} <button onClick={self.renderEditOrgsPage}>Edit Org</button></li>
        // });

        return (
            <div id="page-wrap">
                You aren't a member of any organisations. Join an existing one or create a new one.
                <h1>Organisations</h1>
                <div id="orgs-list">
                    <ul>
                        {this.mapOrgs()}
                    </ul>
                </div>

                <h1>Create Organisation</h1>
                <div>
                    <label>Name:</label>
                    <input type="text" />
                    <br />
                    <label>Hourly rate: $</label>
                    <input type="text" />
                    <br />
                    <button>Create and Join</button>
                </div>
            </div>
        )
    }

}