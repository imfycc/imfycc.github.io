---
title: 微信开发之判断用户是否关注了你的公众平台
date: 2015-11-23 00:00
updated: 2015-11-23 00:00
overdue: true
tags: 微信
categories: 编程
---

### 判断这个有什么用呢？
> 引导用户关注你的微信公众号

这一节不是从基础开始，如果这几个知识点，你不清楚，请先看上一章。

    1、如何获取openid

    2、怎样请求接口

依旧参考[wiki](http://mp.weixin.qq.com/wiki/)

侧边栏，用户管理--->[获取用户基本信息(UnionID机制)](http://mp.weixin.qq.com/wiki/17/c807ee0f10ce36226637cebf428a0f6d.html)

往下翻，第二个表格有这样一个参数：

```
subscribe

用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息。
```
<!--more-->

这就是我们今天要找的那个小伙伴。就是靠他，来判断用户是否关注了你的微信平台。

怎么获取这个值呢？

**1、请求这个接口**
```
https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
```
请求这个接口前我们要先准备两个参数

`OPENID` 的获取请看上一章。

`access_taken` 的获取和上一章就不同了，wiki里一直强调一点，就是网页授权里获取的 `access_taken` 和平常的用的 `access_taken` 是不同的。

> 也就是说，在网页开发时获取的access_taken，不能再继续用在这里，获取subscribe


我们接着看wiki，在左侧的导航栏里找到：
获取接口调用凭据-->[获取access token](http://mp.weixin.qq.com/wiki/2/88b2bf1265a707c031e51f26ca5e6512.html)


请求以下地址获取access_token：
```
https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
```
**记得替换APPID，APPSECRET。获取方式：看上一章**

正常情况下，微信会返回下述JSON数据包给公众号：

```json
{"access_token":"ACCESS_TOKEN","expires_in":7200}
```

如果出现以下形式的错误，可以根据返回的错误码，分析错误。

```json
{"errcode":40013,"errmsg":"invalid appid"}
```

[全局返回码说明](http://mp.weixin.qq.com/wiki/17/fa4e1434e57290788bde25603fa2fcbd.html)


好了，现在我们有 `opebid` 和 `access_token` 了，就可以请求以下的地址获取 `subscribe` 了。
```
https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
```

### 总结

> 整理一下我们的思路，我们想获得subscribe的值，用来判断用户是否关注了我们的微信公众平台。首先我们要准备openid和access_taken（这是第一个，我们叫他帅哥）两个值。得到openid 要先获取access_taken（这是第二个，我们叫她美女）虽然都叫access_taken，但是他们的获取方式是不同的，这两个access_taken，是不一样的（一男一女嘛）。重点就在这里。我们先通过网页授权获得taken_access,然后获取openid。
