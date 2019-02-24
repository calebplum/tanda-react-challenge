import React, { Component } from 'react';

export class ViewShifts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            existingShifts: 'none'
        };
        this.createShift = this.createShift.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.mapShifts = this.mapShifts.bind(this);
    }


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
                // console.log(data);
                this.setState({
                    existingShifts: data
                })
                // const shifts = Array.from(data).map(start => <td>{start}</td>);

                // console.log('shifts', shifts)
            }).catch((err) => {
            console.log(err);
        });
    }

    mapShifts() {

        console.log('shifts from state', this.state.existingShifts);

        const shifts = Array.from(this.state.existingShifts).map(function(shift) {

            // Format the shift's start time
            var startDateObj = new Date(shift.start);
            var shiftStartDateStr = startDateObj.getDate().toString() + '/' + startDateObj.getMonth().toString() + '/' + startDateObj.getFullYear().toString();
            var shiftStartTimeAmPm = 'PM';
            if (startDateObj.getHours() <= 12) {
                shiftStartTimeAmPm = 'AM'
            }
            var shiftStartTimeStr = startDateObj.getHours() + ':' + startDateObj.getMinutes() + shiftStartTimeAmPm;

            // Format the shift's end time
            var finishDateObj = new Date(shift.finish);
            var shiftFinishTimeAmPm = 'PM';
            if (finishDateObj.getHours() <= 12) {
                shiftFinishTimeAmPm = 'AM'
            }
            var shiftFinishTimeStr = finishDateObj.getHours() + ':' + finishDateObj.getMinutes() + shiftFinishTimeAmPm;

            // Format the shift's break if null
            var shiftBreak = shift.breakLength;
            if (shift.breakLength === null) {
                shiftBreak = '0'
            }

            // Calculate and format the hours worked
            var shiftDurationMilliseconds = finishDateObj - startDateObj;
            var shiftDurationHours = (shiftDurationMilliseconds / (1000 * 3600));
            shiftDurationHours = shiftDurationHours - (shiftBreak / 60);    // Subtract the duration of the break (if any) from shift's duration
            var shiftDurationFormatted = shiftDurationHours.toFixed(2);


            return (
                <tr>
                    <td id='employee-name'>
                        {shift.userId}
                    </td>
                    <td id='shift-date'>
                        {shiftStartDateStr}
                    </td>
                    <td id='start-time'>
                        {shiftStartTimeStr}
                    </td>
                    <td id='finish-time'>
                        {shiftFinishTimeStr}
                    </td>
                    <td id='break-length'>
                        {shiftBreak}
                    </td>
                    <td id='hours-worked'>
                        {shiftDurationFormatted}
                    </td>
                    <td id='shift-cost'>
                        {shift.userId}
                    </td>
                </tr>
            )
        });
        console.log('shifts',shifts);
        return shifts;

        // const shifts = Array.from(this.state.existingShifts).map(function(shift) {
        //     var startDateObj = new Date(shift.start);
        //     var finishDateObj = new Date(shift.finish);
        //     var shiftStartDateStr = startDateObj.getDate().toString() + '/' + startDateObj.getMonth().toString() + '/' + startDateObj.getFullYear().toString()
        //         // <tr><td>{shift.userId}</td><td>{shift}</td></tr>
        //     return (
        //         <tr>
        //             <td>
        //                 {shift.userId}
        //             </td>
        //             <td>
        //                 {shift.userId}
        //             </td>
        //             <td>
        //                 {shift.userId}
        //             </td>
        //             <td>
        //                 {shift.userId}
        //             </td>
        //             <td>
        //                 {shift.userId}
        //             </td>
        //             <td>
        //                 {shift.userId}
        //             </td>
        //             <td>
        //                 {shift.userId}
        //             </td>
        //         </tr>
        //
        //     )
        //     });
        // return shifts;

    }

    createShift() {

        const {cookies} = this.props;
        fetch('/shifts/', {
            method: 'post',
            headers: {
                'Authorization': cookies.get('session-id'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'userId': 2,
                'start': "2018-01-01 10:15",
                'finish': "2018-01-01 12:20"
            })
        }).then((res) => {
            console.log(res);
        })

    }

    render() {
        return (
            <div id="page-wrap">
                {/*{console.log(this.props.userData)}*/}
                <h1>{this.props.usersOrgName}</h1>
                <b>Shifts</b>
                <table border="1px solid">
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
                    {/*existing shifts go in a row here/*/}
                    {this.mapShifts()}
                    <tr>
                        <td>
                            {this.props.userData.orgData.name}
                        </td>
                        <td>
                            <input></input>
                        </td>
                        <td>
                            <input></input>
                        </td>
                        <td>
                            <input></input>
                        </td>
                        <td>
                            <input></input>
                        </td>
                        <td colSpan="2">
                            <button onClick={this.createShift}>Create shift</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}