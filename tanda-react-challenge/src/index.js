import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { sessionReducer } from 'redux-react-session'
import {LoginPage} from "./components/LoginPage";
import {RegistrationPage} from "./components/RegistrationPage";

let initialStore = {
    'session-id': null
};

const store = createStore(sessionReducer, initialStore);

ReactDOM.render(
    <CookiesProvider>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </CookiesProvider>,

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

