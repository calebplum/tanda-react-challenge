import React, { Component } from 'react';
import { NoOrgs } from './NoOrgs.js';
import { CheckLoggedIn } from './CheckLoggedIn.js'
import {EditOrg} from "./EditOrg";
import {CurrentOrg} from './CurrentOrg.js'

export class OrgsPage extends Component {

    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            name: '',
            memberOrganisation: null,
            pageName: "",
            userData: props.userData.userData,
            orgData: props.userData.orgData,
            // changePage: props.changePage
        };
        this.leaveOrg = this.leaveOrg.bind(this);
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);

    }

    rerenderParentCallback() {
        this.forceUpdate();
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
            this.props.changePage('/orgs', this.props.userData);    // TODO - doesn't work because it's changing to the current page
        })
    }



    render() {
        return (
            <div id="page-wrap">
                [OrgsPage]
                <CheckLoggedIn cookies={this.props.cookies}/>
                Logged in as {this.state.userData.name} <span id="logout">Logout</span>

                {console.log(this.state.orgData)}
                {/*{this.state.orgData.organisationId === null*/}
                    {/*?   <NoOrgs cookies={this.props.cookies} userData={this.userData} orgData={this.state.orgData} changePage={this.props.changePage} rerenderParentCallback={this.rerenderParentCallback}/>*/}
                        {/*: <CurrentOrg cookies={this.props.cookies} leaveOrg={this.leaveOrg} orgData={this.state.orgData} />}*/}
                {this.state.orgData.organisationId === null
                    ?   this.props.changePage('/noOrgs')

                    : <CurrentOrg cookies={this.props.cookies} leaveOrg={this.leaveOrg} orgData={this.state.orgData} changePage={this.props.changePage}/>}
            </div>
        )
    }

}