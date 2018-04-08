/**
 * @file 生产环境构建脚本文件
 * @author simmons8616(simmons0616@gmail.com)
 */

// 引入node模块
const fs = require('fs');
const path = require('path');

// 引入第三方模块
const inquirer = require('inquirer');
const prettier = require('prettier');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const uglify = require('uglify-js');

const pkg = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'package.json'))
);
const banner = `/*!
 * BdScroll v${pkg.version}
 * ${pkg.repository}
 *
 * Copyright (c) 2017-2018
 * Released under the ${pkg.license} license
 */`;

/**
 * 获取输出文件的配置信息，便于rollup进行编译
 *
 * @param {string} filename 输出的文件名称
 * @param {string} format 格式化类型
 * @param {string} moduleName 对外暴露的模块名称
 * @param {boolean} min 是否是压缩文件
 * @return {*}
 */
const getProRollUpConfig = ({filename = 'bdscroll', format, moduleName = 'BdScroll', min = false}) => {
    const basicConfig = {
        input: './src/index.js',
        output: {
            file: `./dist/${filename}.js`,
            format,
            name: moduleName
        },
        plugins: [
            resolve(),
            babel(
                {
                    exclude: 'node_modules/**'
                }
            )
        ],
        banner,
        min
    };

    if (min) {
        return Object.assign(
            basicConfig,
            {
                output: {
                    file: './dist/bdscroll.min.js',
                    format,
                    name: moduleName
                }
            }
        );
    }

    return basicConfig;
};

/**
 * 选择输出文件类型（包括amd，cjs，es，iife，umd这几种类型）
 *
 * @return {Promise}
 */
function chooseFormatType() {
    const questions = [
        {
            type: 'checkbox',
            name: 'format',
            message: '请选择要输出的模块类型',
            default: [
                'umd',
                'es',
                'cjs'
            ],
            choices: [
                {
                    name: 'amd'
                },
                {
                    name: 'cjs'
                },
                {
                    name: 'es'
                },
                {
                    name: 'iife'
                },
                {
                    name: 'umd'
                }
            ]
        }
    ];

    return new Promise(
        (resolve, reject) => {
            inquirer
                .prompt(questions)
                .then(
                    answers => {
                        try {
                            const configs = answers.format.map(
                                (module = 'umd') => {
                                    let filename = 'bdscroll';

                                    if (module !== 'umd') {
                                        filename = `bdscroll.${module}`;
                                    }

                                    return getProRollUpConfig(
                                        {
                                            filename,
                                            format: module
                                        }
                                    );
                                }
                            ).concat(
                                // 以下代码主要是为了单独输出一个umd格式的min文件
                                getProRollUpConfig(
                                    {
                                        format: 'umd',
                                        min: true
                                    }
                                )
                            );

                            resolve(configs);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }
                );
        }
    );
}

/**
 * 异步函数，输出编译后文件方法
 *
 * @param {Object} config 输出文件的配置信息
 * @return {Promise.<void>}
 */
async function outputDistFile(config) {
    const bundle = await rollup.rollup(config);
    const output = await bundle.generate(config);
    const outputCode = output.code;
    const filePath = config.output.file;

    // 如果dist目录不存在，生成dist目录
    if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist');
    }

    if (config.min) {
        const minifiedCode = banner + '\n' + uglify.minify(outputCode).code;

        fs.writeFileSync(filePath, minifiedCode);
    }
    else {
        const formattedCode = prettier.format(
            outputCode,
            {
                tabWidth: 4,
                bracketSpacing: false
            }
        );

        fs.writeFileSync(filePath, formattedCode);
    }
}

/**
 * 异步函数，构建流程方法（包括选择输出文件类型，输出编译后文件操作）
 *
 * @return {Promise.<void>}
 */
async function build() {
    const configs = await chooseFormatType();
    configs.forEach(outputDistFile);
}

// 开始构建流程
build();
