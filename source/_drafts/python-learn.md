---
title: 人生苦短，学点 python 
date: 2018-04-20 22:46:33
updated: 2018-04-20 22:46:33
tags:
categories: 编程
---

> 最近想写个 Alfred 的 workflow，发现 python 是 Alfred 默认支持的编程语言之一。趁此机会，学习一下 python

python2 中文编码问题

Python中默认的编码格式是 ASCII 格式，在没修改编码格式时无法正确打印汉字，所以在读取中文时会报错。

解决方法为只要在文件开头加入 # -*- coding: UTF-8 -*- 或者 #coding=utf-8 就行了

```
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
print "你好，世界";
```

print 默认输出是换行的，如果要实现不换行需要在变量末尾加上逗号 ,

# 不换行输出
print x,
print y,

# 不换行输出
print x,y

可以使用斜杠（ \）将一行的语句分为多行显示，
total = 'a' + \
        'b' + \
        'c'
        
        'abc'
        
        
        a, b, c = 1, 2, "john"
以上实例，两个整型对象1和2的分配给变量 a 和 b，字符串对象 "john" 分配给变量 c。


s = 'ilovepython'
s[1:5]的结果是love。




