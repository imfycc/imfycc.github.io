---
title: ubuntu 下给软件起别名并创建快捷方式
date: 2015-11-25 22:00:49
updated: 2017-07-10 22:00:49
tags:
categories: 编程
---

> 最近发现了一款很棒的 Markdown 编辑器，[小书匠](http://soft.xiaoshujiang.com/),多平台，还有Linux版，倍爽，当然也有让我很揪心的经历，删除的时候没有提醒，不小心点到文档就没了

下载的小书匠编辑器没有自己创建快捷方式，也没有生成命令。

于是就用 `alias` 命令生成该软件的打开命令。

```
alias 别名 = '命令名或者软件地址'
```
例：

```
alias mk = '/Public/story/Story-write'
```
生效：

```
source ～/.zshrc
```
这样在终端输入mk 就可以打开软件了。

但是还是不够高效，我们在为它加一个快捷方式，放在启动栏。

在 `/usr/share/applications/`

创建一个 `xxx.desktop` 的文件（xxx,是你给他起的名）

内容如下：

```
  [Desktop Entry]
  Name=mk
  Name[zh_CN]=小书匠
  Exec=/home/vic/Public/soft-write/Story-writer
  Terminal=false
  Type=Application
  StartupNotify=true
  Icon=/home/vic/Pictures/ico/linux.png
```
修改这三项就行

`name` 明名

`Exec` 是软件的地址

`Icon` 是你想换的图片地址

改完之后，图标有时候不会立即出现，重启就好了。
