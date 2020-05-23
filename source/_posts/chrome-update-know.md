---
title: 从哪里了解 Google Chrome 升级的新特性
date: 2018-06-26 19:36:25
updated: 2020-05-23
tags:
categories: 编程
---

## Google Chrome canary dev beta stable 4 个版本的区别

** 开发流程是这样的 **

```
canary -> dev -> beta -> stable
```

{% qnimg chrome-version-diff.jpg 'alt:chrome version' extend:?imageView2/2/w/750 %}

`canary` 是最激进的，几乎每天都更新。

`stable` 是稳定版，是面向普通用户，平均六周更新一次

`canary` 和 `stable` 会相差 2 个左右的版本。比如 `stable` 版本现在（2018年6月26日）是 67，`canary` 现在是 69。

{% qnimg chrome-update-time.jpg 'alt:chrome update' extend:?imageView2/2/w/750 %}

## Chromium 和 Chrome 的区别

- `Chromium` 是一个开源的浏览器。 

- `Chrome` 是基于 `Chromium` 而来。

- `Chromium` 更新速度和 `canary` 是一致的。

- `Chromium` 作为一个开源项目去掉了一些不开源的东西，比如 `Google` 的标识和 `flash` 插件等等。 

## 从哪里可以看到 Chrome 的更新

### Canary 版

`Canary` 版 几乎每天都更新，但是没有更新日志。只能通过源码的提交记录查看。[项目地址](https://chromium.googlesource.com/chromium/src/)

然后找到 `tags` 比如 [`69.0.3473.1`]

新页面里点击 `log` 即可查看每次的提交

## Dev 版

https://blog.chromium.org/

## Stable 版

https://chromereleases.googleblog.com/

