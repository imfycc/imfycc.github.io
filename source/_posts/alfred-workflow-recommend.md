---
title: 效率神器 Alfred workflow 插件推荐
date: 2018-04-20 00:38:07
updated: 2019-05-21 07:17:07
tags:
categories: 最热
---

{% qnimg alfred.png 'alt:alfred' extend:?imageView2/2/w/750 %}


> 以下是我常用的 Alfred workflow

⚠️ 不同插件，可能有不同作者开发的版本，我推荐的不一定是最好的，只是我一直在用的。比如像有道翻译，可以找到很多版本，选择自己喜欢的即可。

> 新发现的插件，会添加在最上面的 🎉

{% qnimg my-alfred-workflow.png 'alt:自用 Alfred Workfolw' extend:?imageView2/2/w/300 %}


## 插件推荐

### 网易云音乐
> 控制网易云音乐的播放、下一首、喜欢等需要操作。

[下载地址](https://github.com/Ironaki/Netease-Alfred-Controller)

### Fixum
> 这款 workflow 可以检测其他 workflow 是否有可更新版本，以及处理兼容性问题，只是其他 workflow 的 “医生” 🏥 ️

{% qnimg alfred-fixum.jpg 'alt:workflow 医生' extend:?imageView2/2/w/500 %}

[下载地址](https://github.com/deanishe/alfred-fixum)

### ip 查询
> 查询本机的公网 ip 和局域网 ip

{% qnimg alfred-ip.jpg 'alt:ip查询' extend:?imageView2/2/w/500 %}

[下载地址](https://github.com/zenorocha/alfred-workflows/tree/master/ip-address)

### 快递查询
> 在 `Alfred` 中查询快递，使用 `kd` 关键字，可以记录已经查过的快递和查询新快递，不需要输入快递公司名称。

{% qnimg alfred-express.jpg 'alt:快递查询' extend:?imageView2/2/w/500 %}

[下载地址](https://github.com/roylez/alfred_kuaidi)

### 锁定屏幕

最近同事介绍的，是 `alfred` 自带的功能，不需要付费即可使用。

{% qnimg alfred-lock.jpg extend:?imageView2/2/w/500 %}

### http status code
> 显示 http 状态码含义

第一款 [下载地址](https://github.com/JoelQ/alfred-http)

第二款 [下载地址](https://github.com/Dreamseer/alfred-http)

{% qnimg alfred-http.jpg extend:?imageView2/2/w/500 %}

### codeVar
> 生成变量名
> 作为一名开发者，我超级 😍 这款 workflow

支持大小驼峰、常量、下划线

[下载地址](https://github.com/xudaolong/CodeVar)

{% qnimg alfred-var.jpg extend:?imageView2/2/w/500 %}

### Color

> 颜色转换工具

⚠️ 需要安装 `node.js` 环境

[下载地址](https://github.com/TylerEich/Alfred-Extras/releases)

{% qnimg alfred-color.jpg extend:?imageView2/2/w/500 %}

### Currency Convert

> 汇率转换

[下载地址](https://github.com/jin5354/alfred3-workflow-CurrencyConvert)

{% qnimg alfred-currency.jpg extend:?imageView2/2/w/500 %}

### Dash
> 和 macOS 上的 Dash 软件配合使用，文档搜索

就不上截图了。

[下载地址](https://github.com/Kapeli/Dash-Alfred-Workflow)

### 豆瓣
> 搜索豆瓣的书籍、电影、音乐，查看评分，打开相关的页面

第一款 [下载地址](https://lucifr.com/2013/03/14/douban-workflow-for-alfred-v2/)

作者个人的 apiKey 失效了，在 workflow 中，去掉 apiKey 即可使用了。

{% qnimg alfred-douban-book.jpg extend:?imageView2/2/w/500 %}

{% qnimg alfred-douban-moive.jpg extend:?imageView2/2/w/500 %}

第二款 [下载地址](https://github.com/xinhangliu/alfred-workflow/tree/master/douban-search)

😄 还支持搜索用户~~

{% qnimg alfred-douban-search.png extend:?imageView2/2/w/500 %}

第三款 [下载地址](https://github.com/swim2sun/Douban-Movie-Workflow)

❗这一款，仅支持豆瓣电影

{% qnimg alfred-douban-movie.png extend:?imageView2/2/w/500 %}

### emoji
> 搜索表情

第一款

* 常用的表情会放在最上面，但是使用的关键词匹配，经常搜不出自己想要的表情
* 好处是开箱即用，而下面一款，需要安装 `node.js` 环境。

[下载地址](https://github.com/carlosgaldino/alfred-emoji-workflow)

{% qnimg alfred-emoji.jpg extend:?imageView2/2/w/500 %}

第二款

* 搜索结果会把相关的表情都展示出来，不只是关键词匹配。
* `node.js` 开发的，需要安装一些必要的环境。

[下载地址](https://github.com/sindresorhus/alfred-emoj）

{% qnimg alfred-emoji-npm.jpg extend:?imageView2/2/w/500 %}

### Encode/Decode
> 编码解码工具

[下载地址](https://github.com/willfarrell/alfred-encode-decode-workflow)

{% qnimg alfred-encode.jpg extend:?imageView2/2/w/500 %}

### Github
> 快速查找项目、用户

[下载地址](https://github.com/gharlan/alfred-github-workflow)

{% qnimg alfred-github.jpg extend:?imageView2/2/w/500 %}

### Gitlab 
> 快速搜索并打开项目，支持自定义域名的 gitlab

[下载地址](https://github.com/lukewaite/alfred-gitlab)

默认配置的是 [`gitlab`](https://gitlab.com/explore), 也可以设置公司的 `gitlab`

输入 `glseturl` 空格后，输入地址。

```js
https://<host>/api/v4/projects

// host 换成自己公司的
```

{% qnimg alfred-gitlab.jpg extend:?imageView2/2/w/500 %}

### nameBeta
> 基于 namebata.com 的查询域名是否注册的工具
> 我自己写的，developing

[下载地址](https://github.com/Youthink/alfred-namebeta-workflow)

{% qnimg alfred-namebeta.jpg extend:?imageView2/2/w/500 %}

### node
> 搜索 npm 包

[下载地址](https://github.com/onvno/alfred-package-workflow)

{% qnimg alfred-node.jpg extend:?imageView2/2/w/500 %}

### Package Managers
> 上面的插件只能搜索 npm 包，这个就强大了 `yarn` `npm` `yo` `brew` `apt-get` `composer` `docker` `gems` `gradle` `hex` `maven` `pypi` 等等，很多语言以及工具的包都可以搜索。

[下载地址](https://github.com/willfarrell/alfred-pkgman-workflow)

### Search Evernote (Chinese Edition)
> 搜索印象笔记

[下载地址](https://github.com/patricorgi/alfred-evernote)

### timestamp-helper
> 时间戳转换

[下载地址](http://www.packal.org/workflow/timestamp)

{% qnimg alfred-timestamp.jpg extend:?imageView2/2/w/500 %}

### 有道翻译
> 单词、句子翻译，支持发音

[下载地址](https://github.com/liszd/whyliam.workflows.youdao)

{% qnimg alfred-youdao.jpg extend:?imageView2/2/w/500 %}

### Open with MacVim
> 使用 MacVim 打开文件

[下载地址](https://github.com/franzheidl/alfred-workflows/tree/master/open-with-macvim)

{% qnimg alfred-macvim.jpg extend:?imageView2/2/w/500 %}

### AlfredHiddenFilesToggle
> macOS 显示隐藏文件

[下载地址](https://github.com/logic1988/AlfredHiddenFilesToggle)

## 插件搜索
> 可以在这三个地方寻找插件

- [packal](http://www.packal.org/)

- [alfredworkflow](http://www.alfredworkflow.com/)

- [Github](https://github.com)

**本文会时常更新，❤️ 的话，可以收藏一下。**

> 欢迎来[我的博客](https://hufangyun.com)评论交流，爬虫那么多，评论在其他地方我可能看不到 😂
