import React, { Component } from 'react';

export class RegistrationPage extends Component {
    render() {
        return (
            <div className="page-wrap">
                <h1>Registration Page</h1>
                <div className="registration-form">
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
