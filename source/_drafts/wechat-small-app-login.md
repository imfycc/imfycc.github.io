---
title: 微信小程序的用户登录
date: 2017-05-14 07:02:00
updated: 2017-05-14 07:02:00
tags:
categories: 编程
---

[微信小程序的官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html)

登录时序图

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/login.png?t=201758)


步骤

第一步，首先通过微信小程序的API wx.login 获取登录凭证code
第二步，请求微信指定的接口换取session_key
第三步，

## 参考链接

http://www.ctolib.com/express-weapp-auth.html

http://www.jianshu.com/p/c5f6c98b2685

首次登录
      没有用户信息
