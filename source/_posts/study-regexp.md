---
title: 掌握正则表达式学习笔记
date: 2017-03-23 13:59:29
updated: 2018-11-22
tags:
categories: 编程
description:
---

> 之前看过[《精通正则表达式》](https://book.douban.com/subject/2154713/)，也翻阅过很多次的文档，但是缺乏实践，理解的也不深刻，很快就忘记了，和没看一样 😂 。

所以，看再多次文档，没用！！！😂 要动手写，实践出真知。💪

## 学习方法

我觉得正则的学习方法是这样的:

1、大体翻阅一遍文档，20 ~ 30 分钟左右。当然聪明的你，可能花的时间更少。😄

2、做题练习，在实践中加深理解。

    ① 做题的时候先自己思考，尝试着去解决。✌️
    ② 如果没有思路，再翻阅文档，思考一下那些组合可能解决问题。😄
    ③ 如果还是不行，就搜索相关的思路。再尝试解决。⚠️ 注意，不是搜索答案。
    ④ 还是解决不了，就去看答案吧。
    
    经过这么长时间的思考、折腾。当你看到答案的时候，印象会更加的深刻。对很多用法理解的也更加的透彻。💯

3、平常的使用过程中，再查漏补缺。

## 文档选择

文档的话，可以从下面根据喜好任选一款。

[正则表达式教程](http://www.runoob.com/regexp/regexp-syntax.html)

[学习正则表达式的简单方法](https://github.com/ziishaned/learn-regex/blob/master/README-cn.md)

[正则表达式30分钟入门教程](http://deerchao.net/tutorials/regex/regex.htm)

## 正则题库

[RegexGolf](https://alf.nu/RegexGolf)

[RegexGolf 答案](https://gist.github.com/jonathanmorley/8058871)

如果有更好的题库，希望能分享给我。😄

## 正则工具

正则网站

https://regex101.com/

http://tool.chinaz.com/regex

https://regexr.com/

[正则语法可视化分析工具](https://regexper.com/)

## 实践

匹配手机号

```js
isMobileValid(number) {
  return number && (/^1[345678]\d{9}$/).test(number);
}
```