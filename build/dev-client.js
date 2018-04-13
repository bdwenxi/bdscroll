/**
 * @file dev-client.js
 * @author simmons8616(simmons0616@gmail.com)
 */

require('eventsource-polyfill');

const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

hotClient.subscribe(
    event => {
        if (event.action === 'reload') {
            window.location.reload();
        }
    }
);
