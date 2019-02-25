const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, '../dist');
// const  theme = require('../antd-theme.js');
module.exports = {
  mode:'development',
  devtool: 'cheap-module-eval-source-map',
  context:path.resolve(__dirname, '../src'),
  entry:{
    vendor: ['react'],
    app: ['./main.js']
  },
  output: {
    path: buildPath,
    publicPath: '/',
    chunkFilename: 'js/[name].[hash].js',
    filename: 'js/[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'], 
    alias: { 
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
    rules: [{
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {}
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader?{modifyVars:'+JSON.stringify(theme)+'}'
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
      // title:'中金易云-门店端',
      // assets: {
      //   favicon: '/imgs/favicon.ico',
      //   config_js: '/config/conf.dev.js'
      // }
    }),
    new webpack.DefinePlugin({__PRODUCTION: JSON.stringify(false)}),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([ 
      // {from: path.resolve(__dirname,'../public/config'),to:'config'},
      // {from: path.resolve(__dirname,'../public/mock'),to:'mock'},
      // {from: path.resolve(__dirname,'../public/images'),to:'images'},
      // {from: path.resolve(__dirname,'../public/fonts'),to:'fonts'},
      // {from: path.resolve(__dirname,'../public/pages'),to:'pages'}
    ])
  ],
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    contentBase: buildPath,
    publicPath: '/',
    historyApiFallback: true,
    // disableHostCheck: true,
    // compress: true,
    hot: true,
    inline:true,
    // proxy: [{
    //   path: '/api',
    //   // target: 'http://172.16.0.98:8788',//本地
    //   target: 'http://47.101.183.209:8788',//测试
    //   changeOrigin: true
    // }]
  }
};
