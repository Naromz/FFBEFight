import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import history from './history';
import Fight from './containers/Fight2'
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
                    {/* <Header /> */}
                    <Switch>
                        <Route path="/fight">
                            <Fight />
                        </Route>
                        <Route exact path="/">
                            <Fight />
                        </Route>
                        <Route path="/units">
                            <h1>units</h1>
                        </Route>
                        <Route path="/directory">
                            <h1>directory</h1>
                        </Route>
                        <Route path="/about">
                            <h1>about</h1>
                        </Route>

                    </Switch>
                </Router>

            </Provider>
        );
    }
}

render(<Main />, document.getElementById('root'));
