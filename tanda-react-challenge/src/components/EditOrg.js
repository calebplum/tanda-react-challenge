import React, { Component } from 'react';
import queryString from 'query-string';

export class EditOrg extends Component {



    constructor(props) {
        super(props);
        this.state = {
            orgId: this.props.orgId,
            orgName: this.props.orgName,
            orgRate: this.props.orgRate
        };
        // this.componentDidMount = this.componentDidMount.bind(this);
    }

    // componentDidMount() {
    //     const {cookies} = this.props; // The cookie store
    //     const urlParams = this.props.urlParams.match.params;
    //     console.log(this.props.urlParams.match.params.orgId)
    //     // console.log(urlParams.orgId);
    //     this.setState({
    //         // orgId: this.props.urlParams.match.params.orgId
    //         orgId: 2,
    //         orgName: 'harry'
    //     });
    //     console.log(this.state);
    //
    //     this.setState({orgId: urlParams.orgId});
        // console.log(this.state)
        // if (cookies.get('session-id') && urlParams.orgId) {
        //     fetch('/organisations', {
        //         method: 'get',
        //         headers: {
        //             'Authorization': cookies.get('session-id'),
        //             'Content-Type': 'application/json'
        //         }
        //     }).then((res) => res.json())
        //         .then((data) => {
        //             // console.log(data);
        //             this.setState({
        //                 orgId: data
        //             });
        //             console.log(data.find(x => x.id === this.params.orgId));
        //         }).catch((err) => {
        //         console.log(err);
        //     });
        // }
    // }

    // componentWillMount() {
        // const { handle } = this.props.match.params;
        // const cookies = {match}; // The cookie store
        // console.log(this.props);
        // const { match: { params } } = this.props;
        // let orgId = queryString.parse(this.props.location.search);  // Fetch the query string parameters
        // console.log(props);
        // if (cookies.get('session-id')) {
        //     fetch('/organisations', {
        //         method: 'get',
        //         headers: {
        //             'Authorization': cookies.get('session-id'),
        //             'Content-Type': 'application/json'
        //         }
        //     }).then((res) => res.json())
        //         .then((data) => {
        //             console.log(data);
        //             this.setState({
        //                 organisations: data
        //             });
        //         }).catch((err) => {
        //         console.log(err);
        //     });
        // }
    // }

    render() {
        return (
            <div>
                <h1>Edit Organisation</h1>
                <label>Name: </label>
                <input type="text" value={this.props.editOrgData.orgName}
                    onChange={(event) =>
                    this.setState({orgName: event.target.value})}/>
                <br />
                <label>Hourly Rate: $</label>
                <input type="text" value={this.props.editOrgData.orgRate}/>
            </div>
        )
    }

}