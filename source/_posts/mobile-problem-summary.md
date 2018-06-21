---
title: 移动端开发的各种坑汇总
date: 2017-03-29
updated: 2017-04-06 17:37
tags:
categories: 编程
description:
---

> 欢迎补充或者提出新的解决方案。😊

## IOS
#### 1、手机晃动时，如果页面上有输入框会触发系统默认的 "取消键入" 功能

**问题描述**：

之前做了一个摇一摇抢红包的活动，前提是需要用户登录，但是用户登陆（表单输入）后再摇，就会触发 "取消键入"。

**解决办法**：

我的登录是抽离的组件，登录成功后，dom也就不存在了。刷新一次页面就可以了。

其他的办法，将有表单输入和晃一晃的页面分开，放在两个页面。

#### 2、IOS的快速连续点击事件

**问题描述**：
之前做了一个戳红包的活动，需要用户快速连续的点击抢红包的按钮，才会触发抽奖的链接，但是IOS系统 click 事件会延迟300ms。

**解决办法**：

有个库叫[fastclick](https://github.com/ftlabs/fastclick)可以处理这个问题

React可以用这个：[react-fastclick](https://www.npmjs.com/package/react-fastclick)库

#### 3、滚动事件
IOS系统是`10.3` 这个问题在微信和 App的 webview 中发现了，safari 和 chrome 没有发现问题。

**问题描述**：

`window.addEventListener('scroll',function(){})`

对滚动事件的监听，页面滚动结束后才触发要执行的函数，并不是滚动开始时触发。

**解决办法**：

`window.addEventListener('touchmove',function(){})`

使用 `touchmove` 事件代替 `scroll` 事件

#### 4、touch 事件和 click 事件共存时，click 事件失效

**问题描述**：

要实现类似IOS系统悬浮球（AssistiveTouch）的功能，可以移动和贴边吸附，还增加了点击跳转链接的功能。

我用的 `react` 框架, `onClick` 和 `touch`类的事件共存的时候，发现click事件失效了，点击事件没有反应，不清楚是IOS的原因还是react的原因。

**解决办法**：

使用 `touch` 事件模拟点击事件，`touchstart` 事件里记录目标元素的位置，与 `touchend` 事件目标元素的位置作比较，位置如果没有改变，则定义为点击事件，不然默认为触摸事件。


## Android

> 暂时还没遇到过 😁

## 都有

1、一个在 App 里打开的H5页面，我想实现定时自动返回上一页，发现 `history.back()` 没有执行

**解决办法**

自动返回需要移动端给H5提供调用方法实现。
