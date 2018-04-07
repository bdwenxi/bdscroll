/*!
 * BdScroll v1.0.0
 * git@github.com:simmons8616/bdscroll.git
 *
 * Copyright (c) 2017-2018
 * Released under the MIT license
 */
(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? (module.exports = factory())
        : typeof define === "function" && define.amd
            ? define(factory)
            : (global.BdScroll = factory());
})(this, function() {
    "use strict";

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    /**
     * @file BdScroll插件主文件
     * @author simmons8616(simmons0616@gmail.com)
     */

    var BdScroll = function BdScroll() {
        var options =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : {};

        _classCallCheck(this, BdScroll);

        console.log(options);
    };

    BdScroll.Version = "1.0.0";

    return BdScroll;
});
