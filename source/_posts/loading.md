---
title: loading 等待不再无聊
date: 2018-03-27 14:20:01
updated: 2018-03-27 14:20:01
tags:
categories: 编程
---

![Spinner-1s-200px](/media/Spinner-1s-200px.gif)

> 很多应用在加载的时候，因为数据还没有返回，会给用户呈现一个加载的动效作为反馈，提示用户数据正在加载。但是如果页面加载的时间太长，可能就会导致用户流失。
> 
> 其实等待加载的这个小细节里，也有很多的创意，让等待不在无聊。

为了让用户能稍等片刻，`loading` 的设计就可以充满趣味性，这里介绍一些比较有趣的 `loading`，让等待的过程变成了一种享受。

## 使用充满趣味性的加载动效

![](http://image.woshipm.com/wp-files/2017/02/a4WTx4yop7z4oCVUMIUl.gif)

![pdECLTLpVFMr4Jc8xCWb](/media/pdECLTLpVFMr4Jc8xCWb.gif)

![161ZG138-44](/media/161ZG138-44.gif)

![161ZJ0S-14](/media/161ZJ0S-14.gif)

![815442-b0b53e2a86279228](/media/815442-b0b53e2a86279228.gif)

![815442-6f23db9af75006ff](/media/815442-6f23db9af75006ff.gif)

![giphy](/media/giphy.gif)

### 品牌的 loading 

> 嵌入自家 logo，强化产品品牌

#### Google 

![04-google-loading-motion-dots-logo](/media/04-google-loading-motion-dots-logo.gif)

#### slack 
![slack_load](/media/slack_load.gif)
#### digg

![815442-668ae4eaf45aab9b](/media/815442-668ae4eaf45aab9b.gif)



> 上面的 `loading` 用户初次见到时候可能会感到比较新颖，但是多次遇到 `loading` 后，趣味性就递减了。

我常用的一款 app 的 `loading` 就很有意思，每次的文案不一样，而且充满趣味性。

这样的 app 即使出现 `loading`，用户不会有等待感，反而想看清楚显示的是什么，对每次的文案充满期待。

```
let noticeString = [
    "正在拼命加载",
    "前方发现楼主",
    "年轻人,不要着急",
    "让我飞一会儿",
    "大爷,您又来了?",
    "楼主正在抓皮卡丘，等他一会儿吧",
    "爱我，就等我一万年",
    "未满18禁止入内",
    "正在前往 花村",
    "正在前往 阿努比斯神殿",
    "正在前往 沃斯卡娅工业区",
    "正在前往 观测站：直布罗陀",
    "正在前往 好莱坞",
    "正在前往 66号公路",
    "正在前往 国王大道",
    "正在前往 伊利奥斯",
    "正在前往 漓江塔",
    "正在前往 尼泊尔"
]
```

## 工具

> 最后，附上几个 `loading` 生成工具。

### loading.io
https://loading.io/

登陆后，免费下载，支持 `loading` 动效的各种格式导出。

![](/media/15221417078807.jpg)

### Loaders
https://connoratherton.com/loaders

纯 `css` 实现的 `loading`

![](/media/15221417417648.jpg)

### spin.js

http://spin.js.org/

在线编辑各种参数

![](/media/15221418378683.jpg)



