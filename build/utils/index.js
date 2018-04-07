/**
 * @file 工程化脚本工具文件
 * @author simmons8616(simmons0616@gmail.com)
 */

const path = require('path');
const fs = require('fs');

const glob = require('glob');

function removeExtension(filename) {
    return filename.substr(0, filename.lastIndexOf('.')) || filename;
}

function getExamplesAssets() {
    return glob.sync(
        '**/*.js',
        {
            cwd: path.resolve(process.cwd(), 'examples')
        }
    );
}

function getEntries() {
    const entries = {};
    const files = getExamplesAssets();

    files.forEach(
        filename => {
            const prefix = removeExtension(filename);

            entries[prefix] = `./examples/${filename}`;
        }
    );

    return entries;
}

function getBabelConfig() {
    return JSON.parse(
        fs.readFileSync(
            path.join(__dirname, '..', '..', '.babelrc')
        )
    );
}

module.exports = {
    getEntries,
    getBabelConfig
};
