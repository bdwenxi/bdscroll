/**
 * @file debug module
 * @author simmons8616(simmons0616@gmail.com)
 */

export const warning = msg => console.error(`[BdScroll warning]: ${msg}`);

export const assert = (condition, msg) => {
    if (!condition) {
        throw new Error(('[BdScroll] ' + msg));
    }
};
