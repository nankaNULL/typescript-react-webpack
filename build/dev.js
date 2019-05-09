const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, '../dist');
// const  theme = require('../antd-theme.js');
module.exports = {
  mode:'development',
  devtool: 'cheap-module-eval-source-map',
  context:path.resolve(__dirname, '../src'), // 解析起点
  entry:{
    vendor: ['react', 'react-dom', 'react-router', 'moment'],
    app: ['babel-polyfill','./main.js']
  },
  output: {
    path: buildPath, // 输出文件存放在本地的目录
    publicPath: '/', // 配置发布到线上资源的 URL 前缀
    chunkFilename: 'js/[name].[hash].js', // 无入口的chunk在输出时的文件名称
    filename: 'js/[name].[hash].js'
  },
  resolve: { // 配置 Webpack 如何寻找模块所对应的文件
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'], // 用于配置在尝试过程中用到的后缀列表
    alias: { // 别名
      '@':path.resolve(__dirname,'../src'),
      'public': path.resolve(__dirname, '../public'),
      'components': path.resolve(__dirname, '../src/components/'),
      'pages': path.resolve(__dirname, '../src/pages/'),
      'layout': path.resolve(__dirname, '../src/layout/')
    }
  },
  externals :{
    'FRONT_CONF': 'FRONT_CONF'
  },
  module: { 
    rules: [{ // 配置模块的读取和解析规则，通常用来配置 Loader
        test: /\.js|jsx$/,
        exclude: /node_modules/, // exclude不包括，include只命中
        use:['babel-loader?cacheDirectory'],
        // use: { // 这算是第二种写法，和上面的意义是一样的
        //   loader: 'babel-loader',
        //   options: {
        //     cacheDirectory:true
        //   }
        // }
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
          // 'less-loader?{modifyVars:'+JSON.stringify(theme)+'}'
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
      hash: false,
      chunksSortMode:'none',
      title:'webpack-react',
      assets: {
        favicon: '/images/favicon.ico', 
        config_js: '/config/conf.dev.js'
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({__PRODUCTION: JSON.stringify(false)}),
    new CopyWebpackPlugin([ 
      {from: path.resolve(__dirname,'../public/images'),to:'images'},
      {from: path.resolve(__dirname,'../public/config'),to:'config'},
    ])
  ],
  devServer: {
    host: '0.0.0.0',
    port: '8181',
    contentBase: buildPath,
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
    compress: true,
    hot: true, // 开启模块热替换功能
    inline:true, // 自动刷新网页实现实时预览
    proxy: [{
      path: '/users',
      target: 'https://api.github.com',//测试
      changeOrigin: true
    }]
  }
};

