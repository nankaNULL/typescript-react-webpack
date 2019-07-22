Babel 6.x  升级到 7.x 踩坑

1. 先把包升一下，对照着npm看看，

   有个地方重视一下

   babel-plugin-transform-decorators-legacy 在7.x 不使用，要替换成@babel/plugin-proposal-decorators

   ![屏幕快照 2019-07-22 下午5.07.31](/Users/apple/Desktop/屏幕快照 2019-07-22 下午5.07.31.png)

2. .plugins[0] [1] must be an object, false, or undefined

   https://www.jianshu.com/p/153437cf30ae

   最新的版本不支持数组形式了。

   ```
   "plugins": [
       ["import", { "libraryName": "antd", "style": true }, "antd"],
       ["import", { "libraryName": "@alifd/next", "style": true }, "@alifd/next"]
   ]
   ```

3. 另外每个config后面需要加个name，否则报错

   ![屏幕快照 2019-07-22 下午4.37.26](/Users/apple/Desktop/屏幕快照 2019-07-22 下午4.37.26.png)

   

4. As of v7.0.0-beta.55, we've removed Babel's Stage presets.

   从 Babel v7 开始，所有针对处于标准提案阶段的功能所编写的预设（stage preset）都已被弃用。

   原先是用了stage-0的，然后报错说已经被废弃，如果要使用原来的请参考以下balabala，但看到这篇

   https://blog.meathill.com/js/some-tips-of-babel-preset-env-config.html

   以后的转译组件都只会放进 preset-env 包里，就不想改了。

5. 安装@babel/plugin-proposal-class-properties

   ![屏幕快照 2019-07-22 下午4.35.44](/Users/apple/Desktop/屏幕快照 2019-07-22 下午4.35.44.png)

5. 插件的顺序（这个真的是骚断腿）

   ![屏幕快照 2019-07-22 下午4.42.24](/Users/apple/Desktop/屏幕快照 2019-07-22 下午4.42.24.png)

6. 然后 @babel/polyfill 这个要被废弃了，官网的没看懂怎么弄，我是参考了这个

   https://blog.csdn.net/weixiaoderensheng/article/details/82993332

