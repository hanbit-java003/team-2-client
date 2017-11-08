const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const utils = require('./webpack.config.utils');

const port = {
    web: 99,
    was: 8080
};

const pages = [{
    html: 'index',
    script: 'main'
}, {
    html: 'mainindex',
    script: 'mainindex'
}, {
    html: 'sub',
    script: 'sub'
}, {
    html: 'searchcafe',
    script: 'searchcafe'
}, {
    html: 'caferesult',
    script: 'caferesult'
}, {
    html: 'showoff',
    script: 'showoff'
}, {
    html: 'showoff-page',
    script: 'showoff-page'
}, {
    html: 'showoff-delete',
    script: 'showoff-delete'
}, {
    html: 'showoff-write',
    script: 'showoff-write'
}, {
    html: 'clinic-details',
    script: 'clinic-details'
}, {
    html: 'veterinary-clinic',
    script: 'veterinary-clinic'
}, {
    html: 'community',
    script: 'community'
}, {
    html: 'infoTip',
    script: 'infoTip'
}, {
    html: 'contact',
    script: 'contact'
}];

module.exports = {
    entry: utils.getEntry(pages),
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:' + port.web + '/',
        filename: './js/[name].[chunkhash].bundle.js'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        url: false
                    }
                }, {
                    loader: 'less-loader'
                }]
            })
        }, {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
        }]
    },
    devServer: {
        contentBase: './dist',
        port: port.web,
        proxy: {
            '/api': 'http://localhost:' + port.was
        }
    },
    plugins: utils.getPlugins(pages)
};