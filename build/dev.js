const { merge } = require('webpack-merge');
const webpack = require('webpack');
const base = require('./base');
const apiMocker = require('mocker-api');

module.exports = merge(base, {
    mode: 'development',
    devtool: 'cheap-module-source-map',

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        host: '0.0.0.0',
        port: '8181',
        historyApiFallback: true,
        // before: function (app) {
        //     apiMocker(app, path.resolve('./mock/index.js'))
        // },
        proxy: [{
            path: '/api',
            // target: 'http://172.16.0.98:8788',//本地
            target: 'http://127.0.0.1:3000',//测试
            changeOrigin: true
        }]
    }
});
