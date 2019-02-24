import React, { Component } from 'react';
import { NoOrgs } from './NoOrgs.js';
import {CurrentOrg} from './CurrentOrg.js'

export class OrgsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orgData: props.userData.orgData,
        };
        this.updateUserOrganisationId = this.updateUserOrganisationId.bind(this);

    }

    updateUserOrganisationId(id) {
        var newOrgData = this.state.orgData;
        newOrgData.organisationId = id;

        this.setState({
            orgData: newOrgData
        })
    }

    render() {
        return (
            <div id="page-wrap">
                {this.state.orgData.organisationId === null
                    ?   <NoOrgs cookies={this.props.cookies} changePage={this.props.changePage} updateUserOrganisationId={this.updateUserOrganisationId}/>
                    : <CurrentOrg cookies={this.props.cookies} orgData={this.state.orgData} changePage={this.props.changePage} updateUserOrganisationId={this.updateUserOrganisationId}/>}
            </div>
        )
    }

}