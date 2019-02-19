import React, { Component } from 'react';
import { Redirect } from 'react-router';

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

        fetch('/auth/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);  // debugging aid
                cookies.set('session-id', data.sessionId, { path: '/' });
                return <Redirect to='/orgs' />;
            }).catch((err) => console.log(err));
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