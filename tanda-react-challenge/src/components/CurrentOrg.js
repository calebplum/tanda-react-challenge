import React, { Component } from 'react';

export class CurrentOrg extends Component {

    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            usersOrgName: ''
        }
        // this.leaveOrg = this.leaveOrg.bind(this);
        // this.getOrgInfo = this.getOrgInfo.bind(this);
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
                // console.log(data);
                // console.log('****id ', this.props.orgData.organisationId);
                var usersOrg = (data.find(x => (x.id === this.props.orgData.organisationId)));  // Find list index for the user's current org
                this.setState({usersOrgName: usersOrg.name});
                this.setState({usersOrgHourlyRate: usersOrg.hourlyRate});
                // console.log('UsersOrg Name: ' + usersOrg.name);
                // console.log('UsersOrg Rate: ' + usersOrg.hourlyRate);
                // this.state.usersOrgName = usersOrg.name;
                return JSON.stringify(usersOrg.name);

                // console.log(result);
            })
            .catch((error) => {
                // console.log(error)
            });

        // fetch('/users/me', {    // Get the user's orgId
        //     method: 'get',
        //     headers: {
        //         'Authorization': cookies.get('session-id'),
        //         'Content-Type': 'application/json'
        //     }
        // }).then((res) => res.json())
        //     .then((data) => {
        //         fetch('/users/')
        //
        //         console.log('users org data');
        //         console.log(data);
        //
        //     }).catch((err) => console.log(err));
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
            // console.log(res);
            this.setState({
                orgData: ""
            });
            // this.props.changePage('/orgs', this.props.userData);    // TODO - doesn't work because it's changing to the current page
            this.props.updateUserOrganisationId(null);
        })
    }


    render() {
        return(
            <div id="page-wrap">
                {/*{console.log(this.props.orgData)}*/}
                [CurrentOrg]
                <h1>{this.state.usersOrgName}</h1>
                {/*{console.log(this.props.orgData)}*/}
                {/*<button onClick={this.props.changePage('/viewShifts')}>View Shifts</button>*/}
                <button onClick={() => this.props.changePage('/viewShifts', this.state.usersOrgName, this.state.usersOrgHourlyRate)}>View Shifts</button>
                | Edit |
                <button onClick={() => this.props.changePage('/editOrg', this.state.usersOrgName, this.state.usersOrgHourlyRate)}>Edit</button>
                {/*<button onClick={() => this.props.leaveOrg()}>Leave Organisation</button>*/}
                <button onClick={() => this.leaveOrg()}>Leave Organisation</button>
            </div>
        )
    }
}