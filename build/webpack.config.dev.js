/**
 * @file webpack dev环境配置文件
 * @author simmons8616(simmons0616@gmail.com)
 */

const merge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const basicConfig = require('./webpack.config.basic');

// 定义webpack配置合并策略
const devStrategy = merge.strategy(
    {
        'module.rules': 'append',
        'plugins': 'append'
    }
);

module.exports = devStrategy(
    basicConfig,
    {
        devtool: '#cheap-module-eval-source-map',
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif|ico)$/,
                    use: [
                        {
                            // 在开发环境下，还是用file-loader直接输出image文件
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new BrowserSyncPlugin(
                {
                    host: 'localhost',
                    port: 3000,
                    proxy: `http://localhost:9000`
                }
            )
        ]
    }
);
