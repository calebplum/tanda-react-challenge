import React, { Component } from 'react';

export class ViewShifts extends Component {

    componentWillMount() {

        const { cookies } = this.props;

        fetch('/shifts/', {
            method: 'get',
            headers: {
                'Authorization': cookies.get('session-id'),
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
            }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div id="page-wrap">
                <h1 onClick={this.fetchShifts}>Bob's Burgers</h1>
                <b>Shifts</b>
                <table>
                    <tbody>
                    <tr>
                        <td>Employee Name</td>
                        <td>Shift Date</td>
                        <td>Start Time</td>
                        <td>Finish Time</td>
                        <td>Break Length</td>
                        <td>Hours Worked</td>
                        <td>Shift Cost</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}