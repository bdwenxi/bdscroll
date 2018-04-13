/**
 * @file 集成BdScroll插件的React组件
 * @author simmons8616(simmons0616@gmail.com)
 */

import React, {Component} from 'react';
import BdScroll from '../../dist/bdscroll';

export default class Scroll extends Component {
    render() {
        return (
            <div>
                BdScroll coming soon!
            </div>
        );
    }

    componentDidMount() {
        console.log(new BdScroll());
    }
}
