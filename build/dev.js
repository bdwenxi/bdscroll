/**
 * @file 开发环境启动脚本
 * @author simmons8616(simmons0616@gmail.com)
 */

const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const app = express();

const devConfig = require('./webpack.config.dev');
const publicPath = devConfig.output.publicPath;
const compiler = webpack(devConfig);

app.use(
    devMiddleware(
        compiler,
        {
            quiet: true,
            publicPath
        }
    )
);

app.use(
    hotMiddleware(
        compiler,
        {
            log() {},
            heartbeat: 1000
        }
    )
);

app.listen(
    7777,
    () => console.log(`BdScroll本地测试服务已于${7777}端口部署`)
);
