---
title: js console 彩蛋的原理与实现
date: 2016-12-12 13:02:07
updated: 2017-01-15 01:08
tags: 好玩
categories: 编程
---

> 打开浏览器的开发者模式的控制台，比如F12（或者shift + command + j）打开Chrome的控制台，有些网站，会在这里面展示一些信息，比如招聘信息。话不多说，先上一波演示。

### 演示

#### 文字类型：

1、[天猫](https://www.tmall.com)

![天猫](https://ooo.0o0.ooo/2017/01/15/587a4df9ce5d4.png)

<!--more-->

2、[百度](https://www.baidu.com)

![百度](https://ooo.0o0.ooo/2017/01/15/587a565731626.png)

3、[更炫酷的](http://stackoverflow.com/questions/7505623/colors-in-javascript-console)

![](https://ooo.0o0.ooo/2017/01/15/587a566f32813.png)

#### 字符画类型：

4、[知乎](https://www.zhihu.com)

![知乎](https://ooo.0o0.ooo/2017/01/15/587a52811c543.png)

5、[hrwhisper](https://www.hrwhisper.me/site-console-log/)

![](https://ooo.0o0.ooo/2017/01/15/587a56e4a2dfc.png)

#### 图片类型：

6、[凹凸实验室](http://labs.qiang.it/qqpai/test/wcn/console/console.html)

![](https://ooo.0o0.ooo/2017/01/15/587a5743ac623.png)

### 实现
>看完，效果。我们一起学习一下，这些是怎么实现这些炫酷的效果

```javascript
console.log('%c', 'CSS代码');
```

### 文字实现：

```
console.log('%c 你好！', 'background: #008000; color: #fff');
```

### 图片实现：

```
console.log('%c            ','background:url(http://7oxgmt.com1.z0.glb.clouddn.com/wp-content/themes/VicSugar-wordpress/public/img/face.jpg) no-repeat left center;font-size:200px');
```

注：`width`、`height` 这几个属性是不支持的，只能用`font-szie`来设置图片高宽。

### 字符画：

>上面的字符画效果是怎么实现的那？哈哈，肯定不是手打的啦。介绍两款很方便的软件，上传图片，可以自动生成对应的字符画。

#### 字符画生成器

http://www.degraeve.com/img2txt.php

http://picascii.com/


##### 字符画直接复制到`console.log`中会报错，处理方式：

1、ES6里有  ` `` ` 这两个点，可以直接处理多行字符串

2、把字符画复制到`Sublime Text`里，全选 然后 `shift + ctrl + l` 多行光标 在每行的开头添加`\n`,然后删除换行，使多行字符串变成单行字符串。


