/**
 * @file BdScroll plugin initMixin class
 * @author simmons8616(simmons0616@gmail.com)
 */

export default class initMixin {
    _init(options) {
        this._handleOptions(options);
    }

    _handleOptions(options) {
        this.options = Object.assign(this.defaultProps, options);
        console.log(this.options);
    }
}
