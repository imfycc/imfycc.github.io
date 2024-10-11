---
title: macOS 重装踩坑记
date: 2021-03-13
updated: 2021-05-14 08:11
tags: 
categories: 
---

> 是不是掉坑里了 😂 ？没事别重装系统，不知道下面的内容能不能帮到你，祝你好运 🎉。

## 长话短说 🚀

不想看我废话，就直接拉到后面看「解决」篇章吧。

## 背景 🚦

本周只有一天的假期，结果周五晚上我手抽筋 👎，头脑一热 🤯，想重装一下 MacBook Pro 的系统 😭。

### 为什么要重装？ 

1、我之前用的 Big Sur 的内测版，电池的循环次数和损耗都在正常范围内，却一直显示需要维修，我想重装一下看看是不是系统问题 🔋。

2、最近这台电脑闲置，想给其他人用，我想恢复出厂设置，让她有一种重新配置新电脑的感觉 ❤️ 。

## 经过 🚜

### 重装前

* 我「时间机器」（Time Machine）内有整个系统的备份
* 我已经整理过这台电脑上比较重要的文件了
* 我之前有过重装的经历
* 我身边还有一台 Mac 🖥

基于以上的条件，我才敢重装的。

但还是太年轻了，掉坑里了。本周唯一的一天假期搭进去了。🐙

我是按照官网 [如何重新安装 macOS](https://support.apple.com/zh-cn/HT204904)这篇文章重装的，我进入恢复模式，把硬盘格式化了。⚠️

🚦注解：下文中涉及到的 「恢复模式」都是指开机 command （⌘） + r 进入的恢复界面。

{% qnimg mac-reinstall-1.jpg extend:?imageView2/2/w/500 %}

然后选择 「Reinstall macOS Big Sur」 重装的时候，一直提示连接不上恢复服务器。😂

然后根据知乎上的问题[MacBook Pro无法与恢复服务器取得联系？](https://www.zhihu.com/question/282626105)

我尝试过：
* 在终端修改时间
* 换其他的 wifi 和 热点

都不行。😂 😂 😂

选择时间机器恢复也不行，因为系统已经没有了。时间机器恢复，必须要有系统。

我重启电脑后，因为硬盘格式化了，系统没有了，直接进系统会出现下面的内容。

{% qnimg mac-reinstall-2.jpg extend:?imageView2/2/w/500 %}

恢复模式进不去了，每次都是直接进入网络恢复模式，网络恢复模式就很随机。每次进度条走了 15 分钟左右，可能会报错，就像下面这样，出个叹号 👻，也可能运气好又进入到恢复模式了 🤩（几率很低）。

{% qnimg mac-reinstall-3.jpg extend:?imageView2/2/w/500 %}

## U 盘引导安装
正常流程走不通，我就想通过 U 盘重装系统。

根据苹果官网的教程 [如何创建可引导的 macOS 安装器 - Apple 支持](https://support.apple.com/zh-cn/HT201372)，下载系统，制作引导 U 盘

我好久没用 U 盘了，翻箱倒柜的找个大学时的 8G 的 U 盘。我一开始用的 macOS Mojave 10.14 和 macOS High Sierra 10.13 制作启动盘，因为这两个系统不到 8G。

发现又坑了。😂 😂 😂

我 2018 年的 Mac 多了 T2 安全芯片，默认不能 U 盘引导安装。点击 U盘的启动盘，依然是进入网络恢复模式。

[配备 Apple T2 安全芯片的 Mac 机型 - Apple 支持](https://support.apple.com/zh-cn/HT208862)

需要在重装前关闭安全设置。

[关于“启动安全性实用工具” - Apple 支持](https://support.apple.com/zh-cn/HT208198)

但是我知道的太晚了，我已经格式化硬盘了。。。现在再在恢复模式关闭，会提示没有系统账号，系统都没了，账号也没了 😂 😂 😂

倒是我后来在网上查到一种方案，可以在恢复模式的命令行进入 U盘，从 U 盘唤起安装程序。😘

能唤起，只是我当前恢复模式的系统是 big sur 的，提示不能比这个版本低。

最新的 Big Sur 系统 12 G，U 盘至少 16G 吧，最后找邻居借了一个，人家的 U 盘将近 256 G 的。😱

现在 U 盘都这么大么 🙀

## 解决

主要参考的这个[提示](https://apple.stackexchange.com/a/398527)。

进入到恢复模式，打开终端根据以下命令唤起 U 盘内的安装程序

```js
// 查看挂载了哪些盘

ls /volumes

// 找到对应的路径 可以 tab 补全 
/volumes/<U盘名>/Install\ macOS\ <对应的系统>.app/Contents/MacOS/InstallAssistant
```

如果安装失败，安装程序会自动退出。如果还在恢复模式，应该是安装失败了😂。

安装失败，可以看一下安装程序的日志（安装程序任务栏有个查看日志），我这里也安装失败过一次，查看日志发现有些超时问题，在这里我又根据知乎上的方法（上文提到的），修改的 date 和输入法，结果就可以了 🙀。（这里很玄学，也可能是我零点左右操作的，苹果的服务又链接上了？🙀 🙆🏻‍♂️ 😳 😱）


安装成功会重启，继续安装过程，系统安装成功。

折腾了一天 😂 😂 😂

我的假期泡汤了。。。

## 总结 😼
1、2018 年开始的 Mac 多加了一个 T2 安全芯片，格式化盘前要先关闭安全设置。

2、如果进入地球的网络恢复模式一直报错，多试几次吧。偶尔会成功的进入恢复界面的。

3、在高版本的恢复界面，是不能重装低版本的系统的。制作引导盘的时候，要制作大于等于当前系统的引导盘。

4、即使没有关闭 T2 芯片的安全设置，在恢复模式的命令行可以进入到 U 盘启动安装程序。（最好还是先关闭，万一以后这条不行了）