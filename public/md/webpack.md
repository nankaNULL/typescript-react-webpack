webpack dev & prod config 

还是比较浅的，并没有太深入，重新看了一遍文档，在之前的基础上补充了一些，

（我之前有做笔记吗？？？好像没有吧）

目录结构：

1. 是是是

遗留问题：

1. HtmlWebpackPlugin插件的配置，
2. externals里对应的

参考文档：

1. <https://www.webpackjs.com/configuration/>

------

基础配置（以dev为例）

1. 这里直接贴代码然后注释吧，要详细些的话要写好多，在注释里写一些需要注意的地方吧

   ```
   const webpack = require('webpack');
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   const path = require('path');
   const buildPath = path.resolve(__dirname, '../dist');
   
   module.exports = {
     mode:'development', // "development" | "production" | "none"
     // 选择模式 开发环境 or 生产环境
     
     devtool: 'cheap-module-eval-source-map',
     // 这个影响的是浏览器调试时，的source代码显示，一般推荐上面这个
     
     context:path.resolve(__dirname, '../src'), // 解析起点
     
     entry:{
       vendor: ['react', 'react-dom', 'react-router', 'moment'], 
       // 第三方库vendor入口
       // 使用vendor属性，将vendor中的代码抽离出来，原因如下：
       // 是因为vendor.js中的内容基本上很少更新，当我们根据业务需求修改相关逻辑代码并重新生成入口文件时（比如app.js），vendor.js仍然在浏览器的缓存中，这时用户只需要重新下载新的入口文件即可。
       
       app: ['babel-polyfill','./main.js'] // 应用程序入口
       // 这里直接 app:'./main.js' 也是可以的，
       // 前面加上babel-polyfill是为了将ES6的语法转为ES5，主要是为了一些低版本的不兼容的浏览器
       // 现在浏览器基本都支持了（只要你是新版本），所以当时没有装babel-polyfill用ES6的语法显示的也很顺畅，
     },
     
     output: {
       path: buildPath, // 输出文件存放在本地的目录
       publicPath: '/', // 配置发布到线上资源的 URL 前缀
       chunkFilename: 'js/[name].[hash].js', // 无入口的chunk在输出时的文件名称
       
       filename: 'js/[name].[hash].js'
       // 这里的[name] | [hash]都是模板，对应生成模块名称，唯一的 hash
       // hash 和 chunkhash的长度还可以指定 [hash:8]
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
         assets: { // 这里的配置依然很懵逼
           favicon: '/images/favicon.icon', 
           config_js: '/config/conf.dev.js'
         }
       }),
       new webpack.NamedModulesPlugin(), // 热加载时直接返回更新文件名
       new webpack.HotModuleReplacementPlugin(),
       // 启用 HMR（热替换模块）配合使用的插件
       // HMR只在dev下
       
       new webpack.DefinePlugin({__PRODUCTION: JSON.stringify(false)}),
       // 允许创建一个在编译时可以配置的全局常量
       // 这里配置了一个常量__PRODUCTION, dev下为false, prod下为true 
     ],
     
     resolve: { // 配置 Webpack 如何寻找模块所对应的文件
       extensions: ['.js', '.jsx', '.scss', '.css', '.json'], 
       // 用于配置在尝试过程中用到的后缀列表
       
       alias: { // 别名
         '@':path.resolve(__dirname,'../src'),
         'public': path.resolve(__dirname, '../public'),
         'components': path.resolve(__dirname, '../src/components/'),
         'pages': path.resolve(__dirname, '../src/pages/'),
         'layout': path.resolve(__dirname, '../src/layout/')
       }
     },
     
     externals :{
     	// 这是外部扩展，是被剥离出来的，不需要依赖模块也可以展示的
     	// 一般放的是静态的文件
       'FRONT_CONF': 'FRONT_CONF'
       // 这个具体怎么应用还没实践
     },
     
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
       proxy: [{ // 代理
         path: '/users',
         target: 'https://api.github.com',//测试
         changeOrigin: true
       }]
     }
   };
   
   ```

   

2. prod 下的一些配置区别，还是上代码（部分）

   ```
   const webpack = require('webpack');
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   const CopyWebpackPlugin = require('copy-webpack-plugin');
   const path = require('path');
   const buildPath = path.resolve(__dirname, '../dist');
   const MiniCssExtractPlugin = require('mini-css-extract-plugin');
   const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
   const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
   module.exports = {
     performance: { // 性能
       hints: false, 
     },
     
     optimization: { // 优化
       runtimeChunk: {
         name: 'manifest'
       },
       minimize: true,
       noEmitOnErrors: true,
       minimizer: [
   	  // 这个插件反正就是压缩js代码的，为什么放在优化里我也不是很清楚，
   	  // 优化这块的配置，不是很理解
         new UglifyJsPlugin({
           cache: true,
           parallel: true,
           sourceMap: false
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
         hash: false,
         chunksSortMode: 'none',
         title:'中金易云-门店端',
         assets: {
           favicon: '/images/favicon.ico',
           config_js: '/config/conf.prod.js'
         }
       }),
       new webpack.optimize.OccurrenceOrderPlugin(true),
       new MiniCssExtractPlugin({
         // 打包css文件的插件
         filename: 'css/[name].[hash].css',
         chunkFilename: 'css/[name].[hash].css'
       }),
       new CopyWebpackPlugin([ 
         // 这个插件是将单个文件或整个目录复制到构建目录
         // 在build后的dist文件夹下能看到对应构建的文件夹
         {from: path.resolve(__dirname,'../public/md'),to:'md'},
       ]),
       new webpack.DefinePlugin({
         __PRODUCTION: JSON.stringify(true)
       }),
     ]
   };
   
   
   ```

   

3. 