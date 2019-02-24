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
            orgsList: null
            // changePage: props.changePage
        };
        this.leaveOrg = this.leaveOrg.bind(this);
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
        // this.fetchOrgsList = this.fetchOrgsList.bind(this);
        this.updateUserOrganisationId = this.updateUserOrganisationId.bind(this);

    }

    rerenderParentCallback() {
        this.forceUpdate();
    }

    // fetchOrgsList() {
    //
    //     const {cookies} = this.props; // The cookie store
    //
    //     if (cookies.get('session-id')) {
    //         fetch('/organisations', {
    //             method: 'get',
    //             headers: {
    //                 'Authorization': cookies.get('session-id'),
    //                 'Content-Type': 'application/json'
    //             }
    //         }).then((res) => res.json())
    //             .then((data) => {
    //                 console.log('from orgspage orgslist', data);
    //                 // this.setState({orgsList: data})
    //                 return data;
    //             })
    //     }
    //
    // }

    updateUserOrganisationId(id) {
        var newOrgData = this.state.orgData;
        newOrgData.organisationId = id;

        this.setState({
            orgData: newOrgData
        })

        // this.props.updateUserDataOrg(id);
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
            this.updateUserOrganisationId(null);
        })
    }



    render() {
        return (
            <div id="page-wrap">
                {/*{this.fetchOrgsList()}*/}
                [OrgsPage]
                {/*<CheckLoggedIn cookies={this.props.cookies}/>*/}
                {console.log(this.props.userData.orgData.name)}
                {/*Logged in as {this.props.userData.orgData.name} <span id="logout">Logout</span>*/}

                {/*{console.log(this.state.orgData)}*/}
                {this.state.orgData.organisationId === null
                    ?   <NoOrgs cookies={this.props.cookies} userData={this.userData} changePage={this.props.changePage} updateUserOrganisationId={this.updateUserOrganisationId} updateUserDataOrg={this.props.updateUserDataOrg}/>
                        : <CurrentOrg cookies={this.props.cookies} leaveOrg={this.leaveOrg} orgData={this.state.orgData} changePage={this.props.changePage} updateUserOrganisationId={this.updateUserOrganisationId}/>}
                {/*{this.state.orgData.organisationId === null*/}
                    {/*?   this.props.changePage('/noOrgs', this.state.orgsList)*/}

                    {/*: <CurrentOrg cookies={this.props.cookies} leaveOrg={this.leaveOrg} orgData={this.state.orgData} changePage={this.props.changePage}/>}*/}
            </div>
        )
    }

}