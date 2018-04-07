/**
 * @file BdScroll插件demo入口文件
 * @author simmons8616(simmons0616@gmail.com)
 */

import React, {Component} from 'react';

import {render} from 'react-dom';

import {
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Basic from 'examples/basic/Index';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/basic"
                           component={Basic}/>
                    <Route path="/"
                           render={() => <Redirect to="/basic" />} />
                </Switch>
            </HashRouter>
        );
    }
}

render(
    <App />,
    document.getElementById('app')
);
