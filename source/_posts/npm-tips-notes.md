---
title: npm 技巧汇总(含国内填坑指南)
date: 2017-08-05 20:32:05
updated: 2018-04-26 20:32:05
tags:
categories: 编程
---

## 针对国内的 `npm` 配置

> 因为中国社会主义特色，部分代码库在下载的时候，有些坎坷。可以做以下的配置优化

### `npm` 使用国内源

使用 `cnpm` 的源

```
npm config set registry http://registry.cnpmjs.org
```
或者使用淘宝的源

```
npm config set registry https://registry.npm.taobao.org
```

除了上面使用命令的方式，也可以直接在 `~/.npmrc` 文件添加

```
registry=https://registry.npm.taobao.org
```

### 设置变量

> 以下几个地址，也替换成淘宝的源，加快下载速度。

在 `~/.npmrc` 文件添加

```
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
electron_mirror=https://npm.taobao.org/mirrors/electron/
```

## `npm` 其他技巧

### `npm` 检查 `package.json` 中未声明的 `package`

```
npm prune
```

运行 `prune` 命令，`npm CLI` 会读取 `package.json`，并将结果与项目的 `/node_modules` 目录进行对比，并打印出不在 `package.json` 之列的模块列表。

### `npm` 改变所有项目的默认前缀

```
npm config set save-prefix ~
```
使用 `~` 比默认的 `^` 行为更加保守。

`~` 将依赖锁定在小版本，允许使用 `npm update` 安装补丁版本。

`^` 将依赖锁定在主版本，允许使用 `npm update` 更新小版本。


### 设置 pyhton 版本

> 有些库可能需要 `python` 辅助编译, 比如 `node-sass` 相关的 `node-gyp`

大部分库默认使用的 `python2`,因为 `Mac` 本身就内置了。如果你的电脑上安装了 `python` 的默认版本是 `3.x`,打包的时候就会报错。可以这样设置：

使用命令

```
npm config set python python2.7
```

或者在 `~/.npmrc` 文件添加下面这一行：

```
python=python2.7
```

 


