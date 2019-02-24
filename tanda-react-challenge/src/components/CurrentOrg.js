import React, { Component } from 'react';

export class CurrentOrg extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            orgName: props.orgData.name
        }
        // this.leaveOrg = this.leaveOrg.bind(this);
    }

    componentWillMount() {

    }


    render() {
        return(
            <div id="page-wrap">
                [CurrentOrg]
                <h1>{this.state.orgName}</h1>
                View Shifts | Edit |
                <button onClick={() => this.props.leaveOrg()}>Leave Organisation</button>
            </div>
        )
    }
}