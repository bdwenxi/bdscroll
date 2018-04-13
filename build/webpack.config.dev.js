/**
 * @file webpack dev环境配置文件
 * @author simmons8616(simmons0616@gmail.com)
 */
const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const basicConfig = require('./webpack.config.basic');

// 定义webpack配置合并策略
const devStrategy = merge.strategy(
    {
        'entry.main': 'replace',
        'module.rules': 'append',
        'optimization': 'replace',
        'plugins': 'append'
    }
);

module.exports = devStrategy(
    basicConfig,
    {
        entry: {
            main: [
                './build/dev-client',
                'react-hot-loader/patch',
                './examples/entry/main.jsx'
            ]
        },
        devtool: 'source-map',
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|gif|ico)$/,
                    use: [
                        {
                            // 在development环境下，还是用file-loader直接输出image文件
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        optimization: {
            runtimeChunk: {
                name: 'manifest'
            },
            splitChunks: {
                chunks: "all",
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: {
                        name: 'vendors',
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/]/
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin(
                {
                    filename: 'index.html',
                    template: './template/index.html',
                    inject: true
                }
            )
        ]
    }
);
