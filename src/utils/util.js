/**
 * @file common util module
 * @author simmons8616(simmons0616@gmail.com)
 */

export const isString = str => typeof str === 'string';

export const isUndef = str => typeof str === 'undefined' || str === null;

export const mixin = (baseClass, ...mixins) => {
    // base class
    const base = class _Combined extends baseClass {
        constructor(...args) {
            super(...args);
            mixins.forEach(
                mixin => mixin.prototype.initializer.call(this)
            );
        }
    };

    // define the method to copy class properties
    const copyProps = (target, source) => (
        Object
            .getOwnPropertyNames(source)
            .concat(Object.getOwnPropertySymbols(source))
            .forEach(
                prop => {
                    const regExp = /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/;

                    if (prop.match(regExp)) {
                        return;
                    }

                    Object.defineProperty(
                        target,
                        prop,
                        Object.getOwnPropertyDescriptor(source, prop)
                    );
                }
            )
    );

    mixins.forEach(
        mixin => {
            copyProps(base.prototype, mixin.prototype);
            copyProps(base, mixin);
        }
    );

    return base;
};
