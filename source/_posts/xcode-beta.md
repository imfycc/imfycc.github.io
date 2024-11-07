---
title: macOS 升级 beta 系统后，如何打开原来版本的 XCode
date: 2024-11-06 00:17:40
updated: 2024-11-06 00:17:40
tags: Xcode
categories: 编程
---

每年开发者大会之后，我都提前安装 beta 版本的 macOS 系统，体验新特性。

但是升级后，系统内的 Xcode 也会变成 Beta 版本，原来的 Xcode 就会覆盖一个禁用的标志，无法打开了。

Xcode Beta 提交新版本无法上架到 App Store，日常开发还是需要使用原来的 Xcode。

本文记录一下，如何打开原来的 Xcode

```shell
open /Applications/Xcode.app/Contents/MacOS/Xcode 

xcode-select -p

sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

## 分享 😆

同时和大家分享一个开源的 Xcode 安装软件 Xcodes，可以下载安装任意版本的 Xcode，很方便。


[官网](https://www.xcodes.app/)

[Xcodes Github](https://github.com/XcodesOrg/XcodesApp)



