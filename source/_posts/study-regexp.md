---
title: 正则表达式实践学习
date: 2017-03-23 13:59:29
updated: 2017-03-23
tags:
categories: 编程
description:
---

>整理一下项目中使用到的正则表达式,实践出真知。

之前看过《精通正则表达式》，但是缺乏实践，使用的不熟练，很容易忘记。

文档：http://deerchao.net/tutorials/regex/regex.htm

工具：http://tool.chinaz.com/regex

<!--more-->

写这种工具性的小函数挺有意思的。

1、手机号码分隔

187 3377 1994

```js
  formatPhoneNumber(rawNumber) {
    return rawNumber.toString().split('').map(function(char, idx) {
      return (idx === 2 || idx === 6) ? char + ' ' : char;
    }).join('').trim();
  }
```

2、匹配手机号

```js
isMobileValid(number) {
  return number && (/^1[345678]\d{9}$/).test(number);
}

```

3、匹配第一个"bat"或者"cat",不区分大小写
```js
/[bc]at/i
```
