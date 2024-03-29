import React, { Component } from 'react';

export class EditOrg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orgId: this.props.editOrgData.orgId,
            orgName: this.props.editOrgData.orgName,
            orgRate: this.props.editOrgData.orgRate
        };
        this.executeEditOrg = this.executeEditOrg.bind(this);
    }

    executeEditOrg() {
        const { cookies } = this.props;
        fetch('/organisations/'+this.state.orgId, {
            method: 'put',
            headers: {
                'Authorization': cookies.get('session-id'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': this.state.orgName,
                'hourlyRate': this.state.orgRate
            })
        }).then((res) => {
            if (res.ok) {
                window.alert('Update successful');
                this.props.changePage('/orgs', this.props.userData);
            }
            else throw new Error(res.status);
        })
            .catch((error) => {
                window.alert('Failed: ' + error)
            })
    }

    render() {
        return (
            <div>
                <h2>Edit Organisation</h2>
                <label>Name: </label>
                <input type="text" id="organisation-name" name="organisation-name" value={this.state.orgName}
                       onChange={(event) =>
                           this.setState({orgName: event.target.value})}/>
                <br />
                <label>Hourly Rate: $</label>
                <input type="text" value={this.state.orgRate}
                       onChange={(event) =>
                           this.setState({orgRate: event.target.value})}/>
                <br />
                <button onClick={this.executeEditOrg}>Submit</button>
            </div>
        )
    }

}