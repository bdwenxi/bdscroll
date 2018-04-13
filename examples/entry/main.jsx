/**
 * @file BdScroll插件demo入口文件
 * @author simmons8616(simmons0616@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../Main';

ReactDOM.render(
    <Main/>,
    document.getElementById('app')
);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept(
        '../Main',
        () => {
            render(Main);
            render(require('../Main'));
        }
    );
}
