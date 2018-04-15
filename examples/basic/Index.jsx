/**
 * @file BdScroll插件basic demo
 * @author simmons8616(simmons0616@gmail.com)
 */

import React, {Component, Fragment} from 'react';
import Scroll from 'examples/scroll/Scroll';

export default class Basic extends Component {
    render() {
        return (
            <div className="bdscroll-inner">
                <div className="bdscroll-content">
                    <span className="top">top</span>
                    <span className="bottom">bottom</span>
                </div>
            </div>
        );
    }
}
