---
title: Javascript Math 用法总结
date: 2018-06-20 07:49:52
updated: 2018-06-20 07:49:52
tags:
categories: 编程
---

`Math.round` 四舍五入取整

`Math.ceil` 返回大于或等于给定数字的最小整数。

`Math.floor` 返回小于或者等于给定数字的最大整数

从数组内随机取一个元素

从指定的范围内，随机取一个整数

```javaScript
 function randomNum(len) {
    return Math.floor(Math.random() * len);
}
```

指定小数的位数


