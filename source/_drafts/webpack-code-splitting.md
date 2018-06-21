---
title: react + webpack 代码拆分
date: 2018-01-03 00:00:00
updated: 2018-01-03 00:00:00
tags:
categories: 编程
---

## 啰嗦一下
写这篇文章的时候，`webpack` 的版本为 `3.10.0`, 我要优化的项目使用的 `webpack` 版本为 `2.2.1`。 `webpack` v2 和 v3 的语法一样，所以以下的优化方案通用。

## 使用
[webpack 中文文档](https://doc.webpack-china.org/guides/code-splitting/)
[webpack 英文文档](https://webpack.js.org/guides/code-splitting/)

`webpack` 专门有一节叫做 `Code Splitting` ([代码拆分](https://doc.webpack-china.org/guides/code-splitting/))。

> 代码拆分能够把代码分离到不同的 `bundle` 中，然后按需加载或并行加载这些文件。代码分离可以用于获取更小的 `bundle`，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

`webpack` 提供了三种常用的代码分离方法：

* 入口起点（Entry Points）：使用 `entry` 配置手动地分离代码。
* 防止重复（Prevent Duplication）：使用 `CommonsChunkPlugin` 去重和分离 `chunk`。
* 动态导入（Dynamic Imports）：通过模块的内联函数调用来分离代码。

打包后的文件可能会含有重复的模块，比如两个页面都用到了 `lodash`，然后打包的时候 `index` 和 `another` 都引入了 `lodash` 造成了重复。这时候，`webpack` 第二种代码分离，就可以排上用场了。

我们可以使用 [`CommonsChunkPlugin`](https://doc.webpack-china.org/plugins/commons-chunk-plugin) 插件处理这个问题。

webpack.config.js

```diff
  const path = require('path');
+ const webpack = require('webpack');
  const HTMLWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting'
-     })
+     }),
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'common' // 指定公共 bundle 的名称。
+     })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```
这样处理后，重复的代码会被打包到 `common.js` 文件中。

TODO: 继续补充。
关于 `CommonsChunkPlugin` 的其他配置可以[参考这里](https://doc.webpack-china.org/plugins/commons-chunk-plugin)

Webpack bundle analyzer 分析问题

CSS 分离

修改m站 发布测试分支
可视化数据对比
是否有现成的库可以用



M 站现在实现了 第一种 入口的代码分离
然后又从各个入口文件抽离公共模块

```
 name: 'common',
      chunks: ['app', 'search', 'product', 'artisan', 'comments', 'order', 'pay']
```
```
 name: ['vendor'],
      minChunks: function(module) {
        return module.context && (
          /node_modules\/(react|react-router|react-dom|redux|react-redux)/
        ).test(module.context);
      }
```

先加载 Vendor 这个
common
最后加载对应的 app


## 原理
## 优化


