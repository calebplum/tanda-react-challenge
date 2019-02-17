import React, { Component } from 'react';

export class LoginPage extends Component {
    render() {
        const { cookies } = this.props;
        return (
            <div id="page-wrap">
                Session-id: {cookies.get('session-id')}
                <h1>Login Page</h1>
                <div className="login-form">
                    <form>
                        <label>
                            Username:
                        </label>
                        <input type="text" id="username" name="username" />
                        <label>
                            Password:
                        </label>
                        <input type="password" id="password" name="password" />
                        <input type="submit" id="submit" value="submit" />
                    </form>
                </div>
            </div>
        );
    }
}