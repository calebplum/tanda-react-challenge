import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class CheckLoggedIn extends Component {

    checkLoggedIn() {
        const cookies = this.props.cookies.cookies;
        // console.log(cookies['session-id']);
        if (!cookies['session-id']) {
            window.alert('Please login');
            return <Redirect to='/' />;
        }

    }

    render() {
        return(
            <div>
                {this.checkLoggedIn()}
            </div>
        )
    }

}