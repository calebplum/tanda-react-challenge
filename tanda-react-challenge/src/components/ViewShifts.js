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
                console.log('api shifts', data);
                this.setState({
                    existingShifts: data
                })
                // const shifts = Array.from(data).map(start => <td>{start}</td>);

                // console.log('shifts', shifts)
            }).catch((err) => {
            console.log(err);
        });
    }

    appendToExistingShifts(shiftStart, shiftFinish, breakLength) {
        const newShiftObject = {
            "id": 2,
            "userId": 2,
            "start": "2018-01-01 10:15",
            "finish": "2018-01-01 12:20",
            "breakLength": null
        };
        var newArray = this.state.existingShifts.push(newShiftObject);
        this.setState({existingShifts: newArray});
    }

    mapShifts() {

        var self = this;

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
        console.log('shifts',shifts);
        return shifts;

    }

    createShift() {

        // check for blank fields, return error alert and end function early if any blank fields are found

        console.log(
            'Shift Date' + this.state.newShiftDate +
            ' Start Time' + this.state.newShiftStartTime +
            ' Finish Time' + this.state.newShiftFinishTime +
            ' Break Length' + this.state.newShiftBreakLength
        );

        // Fetch and format the start date of the new shift (DD/MM/YYYY)
        var newShiftDateArray = this.state.newShiftDate.split('/');
        var newShiftDateDay = newShiftDateArray[0];
        var newShiftDateMonth = newShiftDateArray[1];
        var newShiftDateYear = newShiftDateArray[2];

        // Fetch and format the start time of the new shift (HH:MM)
        var newShiftStartTimeArray = this.state.newShiftStartTime.split(':');
        var newShiftStartTimeMinute = newShiftStartTimeArray[0];
        var newShiftStartTimeHour = newShiftStartTimeArray[1];

        // Fetch and format the end time of the new shift (HH:MM)
        var newShiftFinishTimeArray = this.state.newShiftFinishTime.split(':');
        var newShiftFinishTimeMinute = newShiftFinishTimeArray[0];
        var newShiftFinishTimeHour = newShiftFinishTimeArray[1];

        // Create the date object for the new shift's start date/time
        var newShiftStartDatetime = new Date(newShiftDateYear, newShiftDateMonth, newShiftDateDay, newShiftStartTimeHour, newShiftStartTimeMinute); // TODO - confirm the datetime's validity, raise alert if invalid

        // Create the date object for the new shift's finish date/time
        var newShiftFinishDateTime = new Date(newShiftDateYear, newShiftDateMonth, newShiftDateDay, newShiftFinishTimeHour, newShiftFinishTimeMinute); // TODO - confirm the datetime's validity, raise alert if invalid

        // Subtract the break time from the shift's end-time
        newShiftFinishDateTime = newShiftFinishDateTime - (parseInt(this.state.newShiftBreakLength) * 60000);
        if (this.state.newShiftBreakLength !== '') {
            var newShiftBreakLength = parseInt(this.state.newShiftBreakLength);
        }
        else {
            var newShiftBreakLength = 0;
        }

        // console.log(
        //     'day: ' + newShiftDateDay +
        //     ' month: ' + newShiftDateMonth +
        //     ' year: ' + newShiftDateYear
        // );


        const {cookies} = this.props;
        fetch('/shifts/', {
            method: 'post',
            headers: {
                'Authorization': cookies.get('session-id'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'userId': 2,
                'start': newShiftStartDatetime.toString(),
                'finish': newShiftFinishDateTime.toString(),
                'breakLength': newShiftBreakLength
            })
        }).then((res) => {
            // console.log(res);
            this.appendToExistingShifts(1, 2, 3);
        })

    }

    render() {
        return (
            <div id="page-wrap">
                {/*{console.log('user data', this.props.usersOrgHourlyRate)}*/}
                {/*{console.log(JSON.stringify(this.state.existingShifts))}*/}
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
                {/*<button onClick={this.props.changePage('/orgs', this.props.userData)}>Back</button>*/}
            </div>
        )
    }

}