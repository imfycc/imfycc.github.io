---
title: Xcode 安装依赖超时问题解决办法
date: 2024-11-06 00:11:09
updated: 2024-11-06 00:11:09
tags: Xcode
categories: 编程
---

## 背景
记录 Xcode 安装依赖超时问题的解决办法。

原因就是 Xcode 并不能走代理，即使开全局模式都不行。

如果能在路由器上配置代理，那么 Xcode 的 Swift package manager 安装依赖就很快。

## 方法
还有一种办法是终端给项目设置代理。然后在项目内执行：

```shell
xcodebuild -resolvePackageDependencies -scmProvider system
```

有其他更好的方式也欢迎补充 😆