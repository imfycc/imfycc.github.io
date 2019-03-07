---
title: 较友好的css字体设置
date: 2015-01-15 17:35:06
updated: 2018-03-07
tags: 前端
categories: 编程
description:
---


```css
body{
  font-family: "Helvetica Neue","Arial","PingFang SC","Hiragino Sans GB","STHeiti","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
}
```

优先设置Helvetica Neue和Arial是因为英文字母优先（毕竟文字少），之后是mac苹方和冬青黑体，再就是微软的雅黑与Linux的WenQuanYi Micro Hei。

## 移动端

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
}
```
参考：https://github.com/AlloyTeam/Mars/blob/master/solutions/font-family.md



