/**
 * @file 开发环境启动脚本
 * @author simmons8616(simmons0616@gmail.com)
 */

const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const inquirer = require('inquirer');
const express = require('express');
const app = express();

const devConfig = require('./webpack.config.dev');
const publicPath = devConfig.output.publicPath;
const compiler = webpack(devConfig);

function chooseDeployPort() {
    const questions = [
        {
            type: 'input',
            name: 'port',
            message: '请输入要部署服务的端口号',
            default: 7777
        }
    ];

    return new Promise(
        (resolve, reject) => {
            inquirer
                .prompt(questions)
                .then(
                    answers => {
                        try {
                            resolve(answers.port);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }
                );
        }
    );
}

async function develop() {
    const port = await chooseDeployPort();

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
        +port,
        () => console.log(`BdScroll本地测试服务已于${+port}端口部署`)
    );
}

// 启动测试服务
develop();
