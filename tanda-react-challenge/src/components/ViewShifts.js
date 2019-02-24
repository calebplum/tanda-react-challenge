import React, { Component } from 'react';

export class ViewShifts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            existingShifts: 'none',
            newShiftDate: '',
            newShiftStartTime: '',
            newShiftFinishTime: '',
            newShiftBreakLength: '',
        };
        this.createShift = this.createShift.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.mapShifts = this.mapShifts.bind(this);
        this.appendToExistingShifts = this.appendToExistingShifts.bind(this);
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
                this.setState({
                    existingShifts: data
                })
            }).catch((err) => {
            console.log(err);
        });
    }

    appendToExistingShifts(shiftStart, shiftFinish, breakLength) {
        const newShiftObject = {
            "id": 2,
            "userId": this.props.userData.orgData.id,
            "start": shiftStart,
            "finish": shiftFinish,
            "breakLength": breakLength
        };
        var newArray = this.state.existingShifts;
        newArray.push(newShiftObject);
        this.setState({existingShifts: newArray});
    }

    mapShifts() {

        var self = this;

        const shifts = Array.from(this.state.existingShifts).map(function(shift) {

            // Format the shift's start time
            var startDateObj = new Date(shift.start);
            var shiftStartDateStr = startDateObj.getDate().toString() + '/' + startDateObj.getMonth().toString() + '/' + startDateObj.getFullYear().toString();
            var shiftStartTimeAmPm = 'PM';
            if (startDateObj.getHours() <= 12) {
                shiftStartTimeAmPm = 'AM'
            }
            // Add a trailing zero to the minutes if necessary
            var shiftStartMinutes = startDateObj.getMinutes();
            if (shiftStartMinutes < 10) {
                shiftStartMinutes += '0';
            }

            var shiftStartTimeStr = startDateObj.getHours() + ':' + shiftStartMinutes + shiftStartTimeAmPm;

            // Format the shift's end time
            var finishDateObj = new Date(shift.finish);
            var shiftFinishTimeAmPm = 'PM';
            if (finishDateObj.getHours() <= 12) {
                shiftFinishTimeAmPm = 'AM'
            }
            // Add a trailing zero to the minutes if necessary
            var shiftFinishMinutes = finishDateObj.getMinutes();
            if (shiftFinishMinutes < 10) {
                shiftFinishMinutes += '0';
            }
            // Build the final timestring
            var shiftFinishTimeStr = finishDateObj.getHours() + ':' + shiftFinishMinutes + shiftFinishTimeAmPm;

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

            // Calculate the shift cost
            var shiftCost = (shiftDurationHours * self.props.usersOrgHourlyRate).toFixed(2);

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
                        ${shiftCost}
                    </td>
                </tr>
            )
        });
        return shifts;
    }

    createShift() {

        // Check for blank fields, return error alert and end function early if any are found
        if (
            this.state.newShiftDate === '' ||
            this.state.newShiftStartTime === '' ||
            this.state.newShiftFinishTime === '')
        {
            return (window.alert('Missing fields'));
        }
        else if (this.state.newShiftDate.indexOf('/') === -1) {
            return (window.alert('Invalid data entered: Dates must be in DD/MM/YYYY format'));
        }
        else if (
            (this.state.newShiftStartTime.indexOf(':') === -1) ||
            (this.state.newShiftFinishTime.indexOf(':') === -1)
        ) {
            return (window.alert('Invalid data entered: Shift times must be in HH:MM format'));
        }

        // Fetch and format the start date of the new shift (DD/MM/YYYY)
        var newShiftDateArray = this.state.newShiftDate.split('/');
        var newShiftDateDay = newShiftDateArray[0];
        var newShiftDateMonth = newShiftDateArray[1];
        var newShiftDateYear = newShiftDateArray[2];

        // Fetch and format the start time of the new shift (HH:MM)
        var newShiftStartTimeArray = this.state.newShiftStartTime.split(':');
        var newShiftStartTimeHour = newShiftStartTimeArray[0];
        var newShiftStartTimeMinute = newShiftStartTimeArray[1];

        // Fetch and format the end time of the new shift (HH:MM)
        var newShiftFinishTimeArray = this.state.newShiftFinishTime.split(':');
        var newShiftFinishTimeHour = newShiftFinishTimeArray[0];
        var newShiftFinishTimeMinute = newShiftFinishTimeArray[1];

        // Create the date object for the new shift's start date/time
        var newShiftStartDatetime = new Date(newShiftDateYear, newShiftDateMonth, newShiftDateDay, newShiftStartTimeHour, newShiftStartTimeMinute); // TODO - confirm the datetime's validity, raise alert if invalid

        // Create the date object for the new shift's finish date/time
        var newShiftFinishDateTime = new Date(newShiftDateYear, newShiftDateMonth, newShiftDateDay, newShiftFinishTimeHour, newShiftFinishTimeMinute); // TODO - confirm the datetime's validity, raise alert if invalid

        // Subtract the break time from the shift's end-time
        var newShiftBreakLength = 0;
        if (this.state.newShiftBreakLength !== '') {
            newShiftBreakLength = parseInt(this.state.newShiftBreakLength);
        }
        newShiftFinishDateTime = new Date(newShiftFinishDateTime - (newShiftBreakLength * 60000));


        const {cookies} = this.props;
        fetch('/shifts/', {
            method: 'post',
            headers: {
                'Authorization': cookies.get('session-id'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'userId': this.props.userData.orgData.id,
                'start': newShiftStartDatetime.toString(),
                'finish': newShiftFinishDateTime.toString(),
                'breakLength': newShiftBreakLength
            })
        }).then((res) => {
            this.appendToExistingShifts(newShiftStartDatetime.toString(), newShiftFinishDateTime.toString(), newShiftBreakLength);
        })

    }

    render() {
        return (
            <div id="page-wrap">
                <h2>{this.props.usersOrgName}</h2>
                <b>Shifts</b>
                <table border="1px solid">
                    <tbody>
                    <tr>
                        <td>User Id</td>
                        <td>Shift Date</td>
                        <td>Start Time</td>
                        <td>Finish Time</td>
                        <td>Break Length (minutes)</td>
                        <td>Hours Worked</td>
                        <td>Shift Cost</td>
                    </tr>
                    {this.mapShifts()}
                    <tr>
                        <td>
                            {this.props.userData.orgData.name}
                        </td>
                        <td>
                            <input id='newShiftDate' onChange={(event) =>
                                this.setState({newShiftDate: event.target.value})}/>
                        </td>
                        <td>
                            <input id='newShiftStartTime' onChange={(event) =>
                                this.setState({newShiftStartTime: event.target.value})}/>
                        </td>
                        <td>
                            <input id='newShiftFinishTime' onChange={(event) =>
                                this.setState({newShiftFinishTime: event.target.value})}/>
                        </td>
                        <td>
                            <input id='newShiftBreakLength' onChange={(event) =>
                                this.setState({newShiftBreakLength: event.target.value})}/>
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