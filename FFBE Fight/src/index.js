import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css'
import App from './App';
import history from './history';
import Fixes from './containers/Fixes'
import Fight from './containers/Fight2'
import Updates from './containers/Updates'
import Issues from './containers/Issues'
import './fonts/finalf.ttf'

import {
    Router,
    Switch,
    Route,
} from "react-router-dom";
import Header from './components/Header';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            name: 'React'
        };
    }
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Header />
                    <Switch>
                        <Route path="/fight">
                            <Fight />
                        </Route>
                        <Route exact path="/">
                            <Fight />
                        </Route>
                        <Route path="/fixes">
                            <Fixes />
                        </Route>
                        <Route path="/issues">
                            <Issues />
                        </Route>
                        <Route path="/updates">
                            <Updates />
                        </Route>

                    </Switch>
                </Router>

            </Provider>
        );
    }
}

render(<Main />, document.getElementById('root'));
