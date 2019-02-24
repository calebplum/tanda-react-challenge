// This component will be mounted on the OrgsPage if the user is not currently a part of any organisations

import React, { Component } from 'react';

export class NoOrgs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organisations: {},
            // userData: props.userData.userData,
            // orgData: props.userData.orgData
            changePage: props.changePage,
            createJoinOrganisationName: '',
            createJoinOrganisationHourlyRate: ''
        };
        this.renderEditOrgPage = this.renderEditOrgPage.bind(this);
        this.joinOrg = this.joinOrg.bind(this);
        this.mapOrgs = this.mapOrgs.bind(this);
        this.createAndJoinOrganisation = this.createAndJoinOrganisation.bind(this);
    }

    componentWillMount() {

        // var orgsList = this.props.fetchOrgsList();
        // this.setState({
        //     organisations: orgsList
        // })
        // console.log(orgsList)

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
        // console.log(this.props.orgData);
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
                    // console.log(data)
                    // console.log('hello');
                    // console.log(this.props.userData);
                    // this.props.changePage('/orgs', this.props.userData)
                    this.props.updateUserOrganisationId(orgId); // Trigger the parent {OrgsPage} component to refresh
                    // this.props.updateUserDataOrg(orgId);
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
        const organisationsList = Array.from(self.state.organisations).map(function(id) {
            // return <li>{id.name} | {id.hourlyRate} <button onClick={self.renderEditOrgPage}>Edit</button></li>
            return <li>{id.name} | {id.hourlyRate} <button onClick={() => self.renderEditOrgPage(id.id, id.name, id.hourlyRate)}>Edit</button>
                <button onClick={() => self.joinOrg(id.id)}>Join</button></li>
        });
        return organisationsList;
    }

    createAndJoinOrganisation() {

        // console.log('name ',this.state.createJoinOrganisationName);
        // console.log('rate ',this.state.createJoinOrganisationHourlyRate);

        const { cookies } = this.props;

        fetch('/organisations/create_join', {
            method: 'post',
            headers: {
                'Authorization': cookies.get('session-id'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                'name': this.state.createJoinOrganisationName,
                'hourlyRate': this.state.createJoinOrganisationHourlyRate
            })
        })//.then((res) => res.json())
            .then((res) => {
            // console.log('res', res);
            if (res.status === 200) {
                window.alert('Successfully created and joined organisation');
                this.props.updateUserOrganisationId(res.json().id)
            }
            else {
                window.alert('Error creating/joining organisation ')
                // console.log(res.message);
            }
        })
        //     .catch((error) => {
        //     window.alert('Failed to create/join organisation: ' + error)
        // })

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
                    <input type="text" value={this.state.createJoinOrganisationName}
                        onChange={(event) =>
                            this.setState({createJoinOrganisationName: event.target.value})}/>
                    <br />
                    <label>Hourly rate: $</label>
                    <input type="text" value={this.state.createJoinOrganisationHourlyRate}
                           onChange={(event) =>
                               this.setState({createJoinOrganisationHourlyRate: event.target.value})}/>
                    <br />
                    <button onClick={this.createAndJoinOrganisation}>Create and Join</button>
                </div>
            </div>
        )
    }

}