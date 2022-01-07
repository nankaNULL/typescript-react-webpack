const webpack = require('webpack');
const path = require('path');
const threadLoader = require('thread-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const buildPath = path.resolve(__dirname, '../dist');
const VERSION = JSON.stringify(require('../package.json').version); // app version.
const IS_DEV = process.env.NODE_ENV === 'development';

const jsWorkerPool = {
    // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
    // 当 require('os').cpus() 是 undefined 时，则为 1
    workers: 2,

    // 闲置时定时删除 worker 进程
    // 默认为 500ms
    // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
    poolTimeout: 2000
};

const cssWorkerPool = {
    workerParallelJobs: 2,
    poolTimeout: 2000
};

threadLoader.warmup(jsWorkerPool, ['babel-loader']);
threadLoader.warmup(cssWorkerPool, ['css-loader', 'less-loader']);

module.exports = {
    context: path.resolve(__dirname, '../src'), // 解析起点
    entry: {
        vendor: ['react'],
        app: ['./main']
    },
    output: {
        path: buildPath, // 输出文件存放在本地的目录
        publicPath: '/', // 配置发布到线上资源的 URL 前缀
        chunkFilename: IS_DEV ? 'js/[name].js' : 'js/[name].[contenthash].js', // 无入口的chunk在输出时的文件名称
        filename: IS_DEV ? 'js/[name].js' : 'js/[name].[contenthash].js'
    },
    // cache: {
    //     type: 'filesystem', // 使用文件缓存
    // },
    resolve: { // 配置 Webpack 如何寻找模块所对应的文件
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css', '.json'], // 用于配置在尝试过程中用到的后缀列表
        alias: { // 别名
            '@': path.resolve(__dirname, '../src'),
            'public': path.resolve(__dirname, '../public'),
            'components': path.resolve(__dirname, '../src/components/'),
            'pages': path.resolve(__dirname, '../src/pages/'),
            'layout': path.resolve(__dirname, '../src/layout/')
        }
    },
    externals: {
        'FRONT_CONF': 'FRONT_CONF'
    },
    module: {
        rules: [{ // 配置模块的读取和解析规则，通常用来配置 Loader
            test: /\.[jt]sx?$/,
            exclude: /node_modules/, // exclude不包括，include只命中
            use: [
                {
                    loader: 'thread-loader',
                    options: jsWorkerPool
                },
                'babel-loader?cacheDirectory'
            ],
        },
        {
            test: /\.(less|css)$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'thread-loader',
                    options: cssWorkerPool
                },
                'css-loader',
                'postcss-loader',
                {
                    loader: "less-loader",
                    options: {
                        lessOptions: {
                            javascriptEnabled: true
                        }
                    }
                }
            ],
        },
        {
            test: /\.(scss|sass)$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?[tv]=[\d.]+)*$/,
            use: ['file-loader?name=[name].[ext]']
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        }),
        new webpack.DefinePlugin({
            VERSION: VERSION
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../src/public/config'), to: 'config' },
                // { from: path.resolve(__dirname, '../src/public/imgs'), to: 'imgs' },
                // { from: path.resolve(__dirname, '../src/public/fonts'), to: 'fonts' }
            ]
        }),
    ],
}
