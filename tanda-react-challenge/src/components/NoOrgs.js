import React, { Component } from 'react';

export class NoOrgs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organisations: {},
            createJoinOrganisationName: '',
            createJoinOrganisationHourlyRate: ''
        };
        this.renderEditOrgPage = this.renderEditOrgPage.bind(this);
        this.joinOrg = this.joinOrg.bind(this);
        this.mapOrgs = this.mapOrgs.bind(this);
        this.createAndJoinOrganisation = this.createAndJoinOrganisation.bind(this);
    }

    componentWillMount() {

        const {cookies} = this.props;

        if (cookies.get('session-id')) {
            fetch('/organisations', {
                method: 'get',
                headers: {
                    'Authorization': cookies.get('session-id'),
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    this.setState({
                        organisations: data
                    });
                }).catch((err) => {
                console.log(err);
            });
        }
    }

    renderEditOrgPage(orgId, orgName, orgRate) {

        const editOrgData = {
            orgId: orgId,
            orgName: orgName,
            orgRate: orgRate
        };

        this.props.changePage('/editOrg', editOrgData);
    }

    joinOrg(orgId) {

        const {cookies} = this.props;

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
                this.props.updateUserOrganisationId(orgId); // Trigger the parent {OrgsPage} component to refresh
            })
            .catch((error) => {
                console.log(error);
            })
    }

    mapOrgs() {

        var self = this;

        const organisationsList = Array.from(self.state.organisations).map(function(id) {
            return <li>{id.name} | {id.hourlyRate} <button onClick={() => self.renderEditOrgPage(id.id, id.name, id.hourlyRate)}>Edit</button>
                <button onClick={() => self.joinOrg(id.id)}>Join</button></li>
        });

        return organisationsList;
    }

    createAndJoinOrganisation() {

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
        }).then((res) => {
            if (res.status === 200) {
                window.alert('Successfully created and joined organisation');
                this.props.updateUserOrganisationId(res.json().id)
            }
            else {
                window.alert('Error creating/joining organisation ');
            }
        })
    }

    render() {
        return (
            <div id="page-wrap">
                <br />
                You aren't a member of any organisations. Join an existing one or create a new one.
                <h2>Organisations</h2>
                <div id="orgs-list">
                    <ul>
                        {this.mapOrgs()}
                    </ul>
                </div>

                <h2>Create Organisation</h2>
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