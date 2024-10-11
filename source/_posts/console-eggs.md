---
title: 浏览器 console 彩蛋的原理与实现
date: 2016-12-12 13:02:07
updated: 2019-01-19 22:08
tags: 好玩
categories: 编程
---

> 打开浏览器的开发者模式的控制台，比如 F12（或者 shift + command + j）打开Chrome 的控制台，有些网站会在这里面展示一些信息，比如招聘信息。话不多说，先上一波演示。

### 演示

#### 文字类型：

1、[天猫](https://www.tmall.com)

{% qnimg console-eggs-tmall.png extend:?imageView2/2/w/500 %}

<!--more-->

2、[百度](https://www.baidu.com)

{% qnimg console-eggs-baidu.png extend:?imageView2/2/w/500 %}

3、[更炫酷的](http://stackoverflow.com/questions/7505623/colors-in-javascript-console)

{% qnimg console-eggs-example.png extend:?imageView2/2/w/500 %}

#### 字符画类型：

4、[知乎](https://www.zhihu.com)

{% qnimg console-eggs-zhihu.png extend:?imageView2/2/w/500 %}

5、[hrwhisper](https://www.hrwhisper.me/site-console-log/)

{% qnimg console-aggs-character-painting.png extend:?imageView2/2/w/500 %}

#### 图片类型：

6、[凹凸实验室](http://labs.qiang.it/qqpai/test/wcn/console/console.html)

{% qnimg console-aggs-jd.png extend:?imageView2/2/w/500 %}

### 实现
>看完效果。我们一起学习一下，这些炫酷效果怎么实现的。

```javascript
console.log('%c', 'CSS代码');
```

### 文字实现：

```javascript
console.log('%c 你好！', 'background: #008000; color: #fff');
```

### 图片实现：

```javascript
console.log('%c            ','background:url(http://7oxgmt.com1.z0.glb.clouddn.com/wp-content/themes/VicSugar-wordpress/public/img/face.jpg) no-repeat left center;font-size:200px');
```

注：`width`、`height` 这几个属性是不支持的，只能用 `font-szie` 来设置图片高宽。

### 字符画：

>上面的字符画效果是怎么实现的那？哈哈，肯定不是手打的啦。介绍两款很方便的软件，上传图片，可以自动生成对应的字符画。

#### 字符画生成器

http://www.degraeve.com/img2txt.php

http://picascii.com/


##### 字符画直接复制到 `console.log` 中会报错，处理方式：

1、ES6 里可以使用  ` ``  符号处理多行字符串。

2、把字符画复制到 `Sublime Text` 里，全选 然后 `shift + ctrl + l` 多行光标 在每行的开头添加 `\n` ，然后删除换行，使多行字符串变成单行字符串。


### 实践

在当前页面，打开浏览器的控制台，就可以看到我博客设置的 `console` 信息了。

代码实现：

```js
var consoleConfig = {
    welcome: '\n欢迎访问 https://hufangyun.com ，围观我的博客(づ｡◕‿‿◕｡)づ！\n',
    theme: '\n本博客使用 %cHexo%c 搭建，博客主题为本人开发的 %chexo-themes-yearn%c ~~~ 🎉🎉🎉 \n\n源码 https://github.com/imfycc/hexo-themes-yearn \n\n如果喜欢可以 star 支持一下 ❤️~\n',
    qrcode: '\n扫描下面的二维码，在手机上查看博客！\n',
    search: '\n想知道这个效果如何实现的？博客内搜索 console 彩蛋！\n'
};

var consoleInfo = (function(consoleConfig) {
    console.log('%c' + consoleConfig.welcome, 'color: #6190e8');
    console.log('%c' + consoleConfig.theme, 'color: #6190e8;','padding: 0 5px;color: #fff;background: #6190e8;','color: #6190e8;','padding: 0 5px;color: #fff;background: #6190e8;','color: #6190e8;');
    console.log('%c' + consoleConfig.qrcode, 'color: #6190e8');
    console.log('%c' + consoleConfig.search, 'color: #6190e8');
    console.log('%c     ', 'background: url(https://static.hufangyun.com/blog-url-qrcode-180-180.png) no-repeat left center;font-size: 180px;');
}(consoleConfig));
```

## 参考链接

[让console充满情怀](https://aotu.io/notes/2016/06/22/An-interesting-experience-on-console/)
