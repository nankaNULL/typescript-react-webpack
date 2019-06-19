# my-react
react-webpack脚手架，参考pc-react-ant.design + 云日志 + 各种文档

==========================

### typescript-react
```text
 typescript 的 在分支typescript下
```

==========================

#### 新增fusion design 
1. 安装依赖
```
yarn add @alifd/next 

// 主题包
yarn add @alifd/theme-4
yarn add @alifd/next-theme-loader @alifd/next-theme-webpack-plugin

```
2. 按需引入配置
(1) babel配置修改
```
"plugins": [
  ["import",[
    { "libraryName": "antd", "style": true },
    { "libraryName": "@alifd/next", "style": true }
  ]],
  ...
]
```
(2) webpack 配置
```
module: {
 rules: [
   {
     test: /\.scss$/,
     use: [
       ...
       '@alifd/next-theme-loader?{"theme":"@alifd/theme-4"}' // 主题包
     ]
   },
   ...
 ]
},
plugins: [
  new ThemePlugin({ theme: '@alifd/theme-4' }), // 主题包
  ...
]

```
3. 注意点
```
官方文档在主题包css文件按需引入的webpack配置中用了extract-text-webpack-plugin
但这个插件默认安装的版本是不支持webpack4.x的，但他又一个4.0的beta版本支持webpack4.x
因此 yarn add extract-text-webpack-plugin@next -D

```
<!-- test key -->



