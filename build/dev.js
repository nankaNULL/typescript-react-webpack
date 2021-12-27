const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, '../dist');
const VERSION = JSON.stringify(require('../package.json').version); // app version.
const apiMocker = require('mocker-api');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    context: path.resolve(__dirname, '../src'), // 解析起点
    entry: {
        vendor: ['react'],
        app: ['./main']
    },
    output: {
        path: buildPath, // 输出文件存放在本地的目录
        publicPath: '/', // 配置发布到线上资源的 URL 前缀
        chunkFilename: 'js/[name].[hash].js', // 无入口的chunk在输出时的文件名称
        filename: 'js/[name].[hash].js'
    },
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
            use: ['babel-loader?cacheDirectory'],
        },
        {
            test: /\.(less|css)$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: true,
                        reloadAll: true,
                    }
                },
                'css-loader',
                {
                    loader: "less-loader",
                    options: {
                        lessOptions: {
                            javascriptEnabled: true
                        }
                    },
                },
            ],
        },
        {
            test: /\.(scss|sass)$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: true,
                        reloadAll: true,
                    }
                },
                'css-loader',
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
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
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
                { from: path.resolve(__dirname, '../src/public/imgs'), to: 'imgs' },
                { from: path.resolve(__dirname, '../src/public/fonts'), to: 'fonts' }
            ]
        }),
    ],
    devServer: {
        host: '0.0.0.0',
        port: '8181',
        contentBase: buildPath,
        publicPath: '/',
        historyApiFallback: true,
        hot: true, // 开启模块热替换功能
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
};

