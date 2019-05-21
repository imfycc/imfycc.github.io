---
title: css在项目中实践设计规范
date: 2017-02-07 11:21:21
update:
tags:
categories:
description:
---

>最近做了一个CMS系统，设计的小伙伴提供了视觉规范。里面定义了字体、颜色、按钮、布局等等的规范，以后相关的CMS系统都会使用这套规范，所以代码的复用性就显得相当重要了。

如图：

{% qnimg css-specification.jpg 'alt:视觉规范' extend:?imageView2/2/w/500 %}

>借此机会，学习一下bootstrap的代码设计理念及其思路，在之后的项目里实践一下。

bootstrap v4版本开始使用 `scss`，正好和我们一样的技术栈。

```
bootstrap/scss
.
├── _buttons.scss
├──省略...
├── _normalize.scss
├── bootstrap-grid.scss
├── bootstrap-reboot.scss
├── bootstrap.scss
├── mixins
│   ├── _alert.scss
│   ├── 省略...
│   └── _visibility.scss
└── utilities
    ├── _background.scss
    ├── 省略....
    └── _visibility.scss
```

Bootstrap中使用[normalize.css](https://github.com/necolas/normalize.css)来初始化样式。关于`normalize.css`可以看[这篇文章](http://jerryzou.com/posts/aboutNormalizeCss/)

scss文件分为两种，一种是以下划线开头的如`_variables.scss`，一种是没有下划线的如`bootstrap.scss`，这两个的区别是前者表示被导入的文件，默认不会编译成对应的css文件，而后者会编译对应的css文件。具体也可参考[sass 语法](http://www.w3cplus.com/sassguide/syntax.html)

## 想解决的问题
1、文件的划分、如何组件化？

2、怎样提高复用性？

3、怎样实现可扩展性？样式的重写？
样式分为两种，一种是基础样式，共同的属性。比如说按钮边的圆角都是2px。一种是区分属性，比如按钮的大小，内边距的大小，按钮文字的大小。
以 button 举例，基础样式放在 `.btn`里，其他的补充性的样式，使用各种其他的class修饰补充。

4、怎么定义颜色？字体大小？
bootstrap 里有个 `_variables.scss` 文件里面定义了文字的大小、颜色什么的。

## 推荐两个与CSS有关的工具
1、**[CSS Stats](http://www.cssstats.com/)** 统计网站的CSS具体数据

2、**[CSS 优先级]** (https://jonassebastianohlsson.com/specificity-graph/)CSS属性优先级分析
