---
title: 正则表达式学习笔记
date: 2017-03-23 13:59:29
updated: 2019-09-15
tags:
categories: 编程
description: 
---

{% qnimg learn-regex.jpg %}

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

[学习正则表达式的简单方法](https://github.com/ziishaned/learn-regex/)

[正则表达式30分钟入门教程](http://deerchao.net/tutorials/regex/regex.htm)

## 正则题库

[RegexGolf](https://alf.nu/RegexGolf)

[我整理的答案](https://github.com/Youthink/Regex-Golf-Answer)

[RegexGolf 答案](https://gist.github.com/jonathanmorley/8058871)

[答案二](https://blog.csdn.net/NJYR21/article/details/79600217)

如果有更好的题库，希望能分享给我。😄

## 正则工具

正则网站

https://regex101.com/

http://tool.chinaz.com/regex

https://regexr.com/

[正则语法可视化分析工具](https://regexper.com/)

[正则语法可视化分析工具2](http://zhoushengfe.com/rline.html)

## 语法

语法  | 含义 |遗忘|语法|含义|遗忘
-----|------|---|---|---|---
[abc]|单个字符 a或b或c||[^abc]| a,b,c以外的单个字符
[a-zA-Z0-9]| 字符范围||.| 任意字符
\s|空字符||\S|非空字符
\d|数字字符||\D|非数字字符
\w|单词(字母，数字，下划线)||\W|非单词
\b|单词边界|+1|\B|非单词边界
^|开头||$|结尾
(...)|分组||(a\|b)|a或b
a*|重复0次或多次||a?|重复0次或1次
a+|重复1次或多次|+1|a{3}|重复3次
a{3,}|重复3次或多次||a{3,5}|重复3到5次
?|非贪婪匹配||(?:abc)|非捕获分组
(?=abc)|正向匹配abc||(?!abc)|正向不匹配abc| +1
\xhh|十六进制hh字符||\uhhhh|十六进制hhhh字符
\u{hhhh}|(仅当设置了u标志时)十六进制hhhh字符||\cX|控制字符
\0|空字符||\数字（n）| 匹配第 n 个（）内的值| +1
\a|alert字符||\t|制表符
\n|换行符||\v|垂直制表符
\f|换页符||\r|回车符
\e|escape字符||[\b]|退格符


## 理解

### `\num`

如下，顺序执行，`\1` 代表重复第一个 `()` 内的元素，`\2` 代表重复第二个 `()` 内的元素

```js

(.)(.)\2\1

// abba

(.)(.)\1\1

// abaa

(.)(.)\1\2

//abab
```

### 匹配回文？

严格意义上的正则表达式不能匹配**未知长度**的回文字符串

```
aba
aabaa
aaaaaabaaaaaa
```

因为在看到'b'之后我们必须倒数 x 次以确保它是回文。但是正则表达式，无法计算 x。

详情[看这里](https://stackoverflow.com/questions/233243/how-to-check-that-a-string-is-a-palindrome-using-regular-expressions)

### 非

`(?!)`

比如匹配非 `abba` 格式的字符串

`^(?!.*(.)(.)\2\1)`


## 实践

匹配手机号

```js
isMobileValid(number) {
  return number && (/^1[345678]\d{9}$/).test(number);
}
```

## Js 字符处理

截取字符串的第一位和最后一位

```js
let str = 'abc';
str.substring(1, str.length-1); // b
```

文章

https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md
