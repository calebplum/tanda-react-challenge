import React, { Component } from 'react';

export class CurrentOrg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersOrgName: ''
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.leaveOrg = this.leaveOrg.bind(this);
    }

    componentDidMount() {

        const {cookies} = this.props;
        const userOrg = this.props.orgData.id;

        fetch('/organisations', {
            method: 'get',
            headers: {
                'Authorization': cookies.get('session-id'),
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((data) => {
                var usersOrg = (data.find(x => (x.id === this.props.orgData.organisationId)));  // Find list index for the user's current org
                this.setState({usersOrgId: this.props.orgData.organisationId});
                this.setState({usersOrgName: usersOrg.name});
                this.setState({usersOrgHourlyRate: usersOrg.hourlyRate});
                return JSON.stringify(usersOrg.name);
            })
            .catch((error) => {
                console.log(error)
            });
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
            this.setState({
                orgData: ""
            });
            this.props.updateUserOrganisationId(null);
        })
    }

    render() {
        return(
            <div id="page-wrap">
                <h2>{this.state.usersOrgName}</h2>
                <button onClick={() => this.props.changePage('/viewShifts', this.state.usersOrgName, this.state.usersOrgHourlyRate)}>View Shifts</button>
                <button onClick={() => this.props.changePage('/editOrg', {orgId: this.state.usersOrgId, orgName: this.state.usersOrgName, orgRate: this.state.usersOrgHourlyRate})}>Edit</button>
                <button onClick={() => this.leaveOrg()}>Leave Organisation</button>
            </div>
        )
    }
}