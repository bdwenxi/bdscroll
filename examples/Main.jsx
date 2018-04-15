/**
 * @file BdScroll插件demo入口组件
 * @author simmons8616(simmons0616@gmail.com)
 */

import React, {Component} from 'react';
import {
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import {hot} from 'react-hot-loader';

import Basic from 'examples/basic/Index';

import 'examples/scss/main.scss';

class App extends Component {
    render() {
        return (
            <div className="bdscroll-panel">
                <div className="bdscroll-header">
                </div>
                <HashRouter>
                    <Switch>
                        <Route path="/basic"
                               component={Basic}/>
                        <Route path="/"
                               render={() => <Redirect to="/basic" />} />
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default hot(module)(App);
