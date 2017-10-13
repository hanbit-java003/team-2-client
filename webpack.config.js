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
    html: 'sub',
    script: 'sub'
}, {
    html: 'member-login',
    script: 'member-login',
}, {
    html: 'member-join',
    script: 'member-join',
}, {
    html: 'veterinary-clinic',
    script: 'veterinary-clinic',
}, {
    html: 'clinic-details',
    script: 'clinic-details'
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