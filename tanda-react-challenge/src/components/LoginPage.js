import React, { Component } from 'react';
import axios from 'axios';

export class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.loginUser = this.loginUser.bind(this);
    }

    loginUser() {
        const { cookies } = this.props;
        console.log(this.state);    // debugging aid

        axios({
            method: 'post',
            url: '/auth/login',
            data: this.state,
            config: { headers: {'Content-Type': 'application/json'} }
        })
            .then(function(response) {
                console.log(response);
                cookies.set('session-id', response.data.sessionId, { path: '/' });
            })
            .catch(function (response) {
                console.log(response);
            })

    }

    render() {
        return (
            <div id="page-wrap">
                <h1>Login Page</h1>
                <div className="login-form">

                    <label>
                        Email:
                    </label>
                    <input type="text" id="email" name="email" value={this.state.email}
                        onChange={(event) =>
                            this.setState({email: event.target.value})}/>
                    <br />
                    <label>
                        Password:
                    </label>
                    <input type="password" id="password" name="password" value={this.state.password}
                           onChange={(event) =>
                               this.setState({password: event.target.value})}/>
                    <button id="submit" onClick={this.loginUser}>Login</button>

                </div>
            </div>
        );
    }
}