const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, '../dist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const threadLoader = require('thread-loader');

const jsWorkerPool = {
  // options

  // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
  // 当 require('os').cpus() 是 undefined 时，则为 1
  workers: 2,

  // 闲置时定时删除 worker 进程
  // 默认为 500ms
  // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
  poolTimeout: 2000
};

const cssWorkerPool = {
  // 一个 worker 进程中并行执行工作的数量
  // 默认为 20
  workerParallelJobs: 2,
  poolTimeout: 2000
};

threadLoader.warmup(jsWorkerPool, ['babel-loader', 'ts-loader']);
threadLoader.warmup(cssWorkerPool, ['css-loader', 'less-loader']);

const config = {
  mode: 'production',
  context: path.resolve(__dirname, '../src'), // 解析起点
  entry: {
    vendor: ['react'],
    app: ['./main']
  },
  output: {
    path: buildPath, // 输出文件存放在本地的目录
    publicPath: './', // 配置发布到线上资源的 URL 前缀
    chunkFilename: 'js/[name].[hash].js', // 无入口的chunk在输出时的文件名称
    filename: 'js/[name].[hash].js'
  },
  resolve: { // 配置 Webpack 如何寻找模块所对应的文件
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css', '.json'], // 用于配置在尝试过程中用到的后缀列表
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
      use: [
        {
          loader: 'thread-loader',
          options: jsWorkerPool
        },
        'babel-loader?cacheDirectory'
      ],
    },
    {
      test: /\.ts|tsx?$/,
      use: [
        {
          loader: 'thread-loader',
          options: jsWorkerPool
        },
        'babel-loader?cacheDirectory',
        {
          loader: 'ts-loader',
          options: {
            happyPackMode: true
          }
        }
      ],
      exclude: /node_modules/,
    },
    {
      test: /\.(less|css)$/,
      use: ['style-loader',
        {
          loader: 'thread-loader',
          options: cssWorkerPool
        },
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
  performance: {
    hints: false,
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: true,
    noEmitOnErrors: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      minSize: 30000,
      maxSize: 3000000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor'
        },
        echarts: {
          chunks: 'all',
          name: 'echarts',
          test: /[\\/]echarts[\\/]/,
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[hash].css'
    }),
    // new CopyWebpackPlugin([
    //   {from: path.resolve(__dirname,'../public/config'),to:'config'},
    //   {from: path.resolve(__dirname,'../public/mock'),to:'mock'},
    //   {from: path.resolve(__dirname,'../public/images'),to:'images'},
    //   {from: path.resolve(__dirname,'../public/fonts'),to:'fonts'},
    //   {from: path.resolve(__dirname,'../public/pages'),to:'pages'}
    // ]),
    new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(true)
    }),
    // new BundleAnalyzerPlugin()
  ]
};

module.exports = smp.wrap(config);
