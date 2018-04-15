/**
 * @file BdScroll plugin entry
 * @author simmons8616(simmons0616@gmail.com)
 */

import {warning, assert} from './utils/debug';
import {isString, isUndef, mixin} from './utils/util';
import initMixin from './initMixin';

export default class BdScroll extends mixin(initMixin) {
    static Version = '1.0.0';

    defaultProps = {
        startX: 0,
        startY: 0,
        scrollX: false,
        scrollY: true,
        freeScroll: false
    };

    constructor(el, options = {}) {
        super();

        this.wrapper = isString(el) ? document.querySelector(el) : el;
        if (!this.wrapper) {
            warning('can not find the wrapper dom');
        }
        this.scroller = this.wrapper.children[0];
        if (!this.scroller) {
            warning(
                'the wrapper need at least one child element to be scroller'
            );
        }

        // init BdScroll properties
        this._init(options);
    }
}
