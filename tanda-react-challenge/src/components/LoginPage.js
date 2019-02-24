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
        // this.getUsersOrg = this.getUsersOrg.bind(this);
    }

    loginUser() {

        if (
            this.state.email === '' ||
            this.state.password === ''
        ) {
            return (window.alert('Missing fields'));
        }

        const { cookies } = this.props;
        this.executeLogin()
            .then(userData => {
                cookies.set('session-id', userData.sessionId, { path: '/' });

                this.getUserOrg(userData.sessionId)
                    .then(orgData => {
                        // console.log("Got org data: " + orgData.id)
                        let allUserData = {
                            userData,
                            orgData
                        }
                        this.props.changePage("/orgs", allUserData);
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error));
    }

    executeLogin() {
        return new Promise((resolve,reject) => {
            fetch('/auth/login', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state)
            })
                .then(function(response) {
                if (response.status === 404) {
                    return (window.alert('Username/password not known'))
                }
                resolve(response.json())
            }).catch((err) => reject(err));
                // .then((res) => res.json())
                // .then((data) => {
                //     console.log(data)
                //     resolve(data);
                //
                // }).catch((err) => reject(err));
        })
    }

    getUserOrg(sessionId) {
        return new Promise((resolve,reject) => {

            fetch('/users/me', {
                method: 'get',
                headers: {
                    'Authorization': sessionId,
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    resolve(data);

                }).catch((err) => reject(err));
        })
    }

    // getUsersOrg(sessionId) {
    //     return new Promise((resolve,reject) => {
    //
    //         fetch('/users/me', {
    //             method: 'get',
    //             headers: {
    //                 'Authorization': sessionId,
    //                 'Content-Type': 'application/json'
    //             }
    //         }).then((res) => res.json())
    //             .then((data) => {
    //                 console.log('users org data');
    //                 console.log(data);
    //                 resolve(data);
    //
    //             }).catch((err) => reject(err));
    //     })
    // }



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
                    <br />
                    <button id="submit" onClick={this.loginUser}>Login</button>
                    <br />
                    <br />
                    <button onClick={() => this.props.changePage('/register')}>Register</button>

                </div>
            </div>
        );
    }
}