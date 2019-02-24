import React, { Component } from 'react';

export class RegistrationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        };

        this.signUpUser = this.signUpUser.bind(this);
    }

    signUpUser() {

        // Input data validation
        if (
            this.state.name === '' ||
            this.state.email === '' ||
            this.state.password === '' ||
            this.state.passwordConfirmation === ''
        ) {
            return (window.alert('Missing fields'));
        }
        else if (this.state.password !== this.state.passwordConfirmation) {
            return (window.alert('Password and Password Confirmation mismatch'));
        }
        else if ((this.state.password).length < 6) {
            return (window.alert('Password must be greater than 6 characters'));
        }

        const { cookies } = this.props;
        // console.log(this.state);    // debug aid

        fetch('/auth/signup',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }).then((res) => res.json())
            .then((data) => {
                cookies.set('session-id', data.sessionId, { path: '/' });
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="page-wrap">
                <h1>Registration Page</h1>
                <div className="registration-form">

                        <label>
                            Name:
                        </label>
                        <input type="text" id="username" name="username" value={this.state.name}
                            onChange={(event) =>
                                this.setState({name: event.target.value})}/>
                        <br />
                        <label>
                            Email:
                        </label>
                        <input type="text" id="name" name="name" value={this.state.email}
                               onChange={(event) =>
                                   this.setState({email: event.target.value})}/>
                        <br />
                        <label>
                            Password (6 characters minimum):
                        </label>
                        <input type="password" id="password" name="password" value={this.state.password}
                               onChange={(event) =>
                                   this.setState({password: event.target.value})}/>
                        <br />
                        <label>
                            Confirm Password:
                        </label>
                        <input type="password" id="confirm-password" name="confirm-password" value={this.state.passwordConfirmation}
                               onChange={(event) =>
                                   this.setState({passwordConfirmation: event.target.value})}/>
                        <br />
                        <button id="submit" onClick={this.signUpUser}>Sign Up</button>
                        <br />
                        <button onClick={() => this.props.changePage('/')}>Cancel</button>

                </div>
            </div>
        );
    }
}
