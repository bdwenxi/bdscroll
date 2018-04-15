/*!
 * BdScroll v1.0.0
 * git@github.com:simmons8616/bdscroll.git
 *
 * Copyright (c) 2017-2018
 * Released under the MIT license
 */
"use strict";

/**
 * @file debug module
 * @author simmons8616(simmons0616@gmail.com)
 */

var warning = function warning(msg) {
    return console.error("[BdScroll warning]: " + msg);
};

var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};

var createClass = (function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
})();

var inherits = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
            "Super expression must either be null or a function, not " +
                typeof superClass
        );
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
        },
    });
    if (superClass)
        Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
};

var possibleConstructorReturn = function(self, call) {
    if (!self) {
        throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
        );
    }

    return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
};

/**
 * @file common util module
 * @author simmons8616(simmons0616@gmail.com)
 */

var isString = function isString(str) {
    return typeof str === "string";
};

var mixin = function mixin(baseClass) {
    for (
        var _len = arguments.length,
            mixins = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
        _key < _len;
        _key++
    ) {
        mixins[_key - 1] = arguments[_key];
    }

    // base class
    var base = (function(_baseClass) {
        inherits(_Combined, _baseClass);

        function _Combined() {
            var _ref;

            classCallCheck(this, _Combined);

            for (
                var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
                _key2 < _len2;
                _key2++
            ) {
                args[_key2] = arguments[_key2];
            }

            var _this = possibleConstructorReturn(
                this,
                (_ref =
                    _Combined.__proto__ ||
                    Object.getPrototypeOf(_Combined)).call.apply(
                    _ref,
                    [this].concat(args)
                )
            );

            mixins.forEach(function(mixin) {
                return mixin.prototype.initializer.call(_this);
            });
            return _this;
        }

        return _Combined;
    })(baseClass);

    // define the method to copy class properties
    var copyProps = function copyProps(target, source) {
        return Object.getOwnPropertyNames(source)
            .concat(Object.getOwnPropertySymbols(source))
            .forEach(function(prop) {
                var regExp = /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/;

                if (prop.match(regExp)) {
                    return;
                }

                Object.defineProperty(
                    target,
                    prop,
                    Object.getOwnPropertyDescriptor(source, prop)
                );
            });
    };

    mixins.forEach(function(mixin) {
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
    });

    return base;
};

/**
 * @file BdScroll plugin initMixin class
 * @author simmons8616(simmons0616@gmail.com)
 */

var initMixin = (function() {
    function initMixin() {
        classCallCheck(this, initMixin);
    }

    createClass(initMixin, [
        {
            key: "_init",
            value: function _init(options) {
                this._handleOptions(options);
            },
        },
        {
            key: "_handleOptions",
            value: function _handleOptions(options) {
                this.options = Object.assign(this.defaultProps, options);
                console.log(this.options);
            },
        },
    ]);
    return initMixin;
})();

var _class, _temp;

var BdScroll = ((_temp = _class = (function(_mixin) {
    inherits(BdScroll, _mixin);

    function BdScroll(el) {
        var options =
            arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
        classCallCheck(this, BdScroll);

        var _this = possibleConstructorReturn(
            this,
            (BdScroll.__proto__ || Object.getPrototypeOf(BdScroll)).call(this)
        );

        _this.defaultProps = {
            startX: 0,
            startY: 0,
            scrollX: false,
            scrollY: true,
            freeScroll: false,
        };

        _this.wrapper = isString(el) ? document.querySelector(el) : el;
        if (!_this.wrapper) {
            warning("can not find the wrapper dom");
        }
        _this.scroller = _this.wrapper.children[0];
        if (!_this.scroller) {
            warning(
                "the wrapper need at least one child element to be scroller"
            );
        }

        // init BdScroll properties
        _this._init(options);
        return _this;
    }

    return BdScroll;
})(mixin(initMixin))),
(_class.Version = "1.0.0"),
_temp);

module.exports = BdScroll;
