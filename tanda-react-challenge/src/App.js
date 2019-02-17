import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { LoginPage } from './components/LoginPage.js';
import { RegistrationPage } from './components/RegistrationPage.js';

class App extends Component {
  render() {
    return (
        <RegistrationPage />
    );
  }
}

export default App;
