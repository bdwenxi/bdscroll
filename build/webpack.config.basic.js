/**
 * @file webpack基础配置文件
 * @author simmons8616(simmons0616@gmail.com)
 */

const path = require('path');

const utils = require('./utils');
const babelConf = utils.getBabelConfig();
const {presets, plugins} = babelConf;

module.exports = {
    context: path.join(__dirname, '..'),
    entry: {
        main: './examples/entry/main.jsx'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, '..', 'node_modules')
        ],
        alias: {
            // 路由页面入口
            examples: path.join(__dirname, '..', 'examples')
        },
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    output: {
        publicPath: '/',
        path: undefined,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets,
                        plugins
                    }
                },
                exclude: ['node_modules']
            },
            {
                test: /\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: presets.concat(['react']),
                        plugins
                    }
                }
            }
        ]
    }
};
