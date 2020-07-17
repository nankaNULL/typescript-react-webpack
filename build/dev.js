const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, '../dist');
// const  theme = require('../antd-theme.js');
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
      test: /\.js|jsx$/,
      exclude: /node_modules/, // exclude不包括，include只命中
      use: ['babel-loader?cacheDirectory'],
    },
    {
      test: /\.ts|tsx?$/,
      use: ['babel-loader', 'ts-loader'],
      exclude: /node_modules/,
    },
    {
      test: /\.(less|css)$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: "less-loader",
          options: {
            javascriptEnabled: true
          }
        }
      ],
    },
    {
      test: /\.(scss|sass)$/,
      use: [
        'style-loader', //上面的简写方式
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
    // new webpack.HotModuleReplacementPlugin(),
    // new CopyWebpackPlugin([ 
    // {from: path.resolve(__dirname,'../public/config'),to:'config'},
    // {from: path.resolve(__dirname,'../public/mock'),to:'mock'},
    // {from: path.resolve(__dirname,'../public/images'),to:'images'},
    // {from: path.resolve(__dirname,'../public/fonts'),to:'fonts'},
    // {from: path.resolve(__dirname,'../public/pages'),to:'pages'}
    // ])
  ],
  devServer: {
    host: '0.0.0.0',
    port: '8181',
    contentBase: buildPath,
    publicPath: '/',
    historyApiFallback: true,
    // disableHostCheck: true,
    // compress: true,
    hot: true, // 开启模块热替换功能
    // inline:true, // 自动刷新网页实现实时预览
    // before: function (app) {
    //   apiMocker(app, path.resolve('./mock/index.js'), {
    //     proxy: {
    //       '/log/api/v2/*': 'http://127.0.0.1:8080',
    //     },
    //     secure: false,
    //   })
    // },
    proxy: [{
      path: '/api',
      // target: 'http://172.16.0.98:8788',//本地
      target: 'http://192.168.1.129:3000',//测试
      changeOrigin: true
    }]
  }
};

