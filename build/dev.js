/**
 * @file 开发环境启动脚本
 * @author simmons8616(simmons0616@gmail.com)
 */

const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const express = require('express');
const app = express();
const handlebars = require('handlebars');

const devConfig = require('./webpack.config.dev');
const publicPath = devConfig.output.publicPath;
const compiler = webpack(devConfig);

// 挂载静态资源
app.use(
    '/bdscroll/dist/dev',
    express.static(
        path.join(__dirname, '..', 'dist', 'dev')
    )
);

app.get(
    '*',
    (req, res, next) => (
        fs.readFile(
            path.join(__dirname, '..', 'template', 'index.hbs'),
            (err, data) => {
                if (err) {
                    next();
                    return;
                }

                const assetPath = `${publicPath}js/main`;
                const renderer = handlebars.compile(data.toString());

                res
                    .type('html')
                    .end(
                        renderer({
                            isDev: true,
                            assetPath
                        })
                    );
            }
        )
    )
);

app.listen(
    9000,
    () => {
        // 打印配置
        const printConfig = {
            hash: false,
            children: false,
            modules: false,
            chunkOrigins: false,
            chunksSort: false,
            source: false,
            // 以下是控制台参数
            chunks: false,
            colors: true
        };

        compiler.watch(
            {},
            (err, state) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log(state.toString(printConfig));
            }
        );

        console.log(`BdScroll本地测试服务已于${9000}端口部署`);
    }
);
